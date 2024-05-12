import { makeAutoObservable, runInAction } from "mobx";
import { Dairy, DairyFormValues } from "../models/dairy";
import { format } from "date-fns";
import agent from "../api/agent";

export default class DairyStore {
  dairyRegistry = new Map<string, Dairy>();
  selectedDairy: Dairy | undefined = undefined;
  editMode = false;
  loading = false;
  loadingInitial = false;

  constructor() {
    makeAutoObservable(this);
  }

  get dairiesByDate() {
    return Array.from(this.dairyRegistry.values());
    // return Array.from(this.dairyRegistry.values()).sort(
    //   (a, b) => a.addedDate!.getTime() - b.addedDate!.getTime()
    // );
  }

  get groupedDairies() {   
    return Object.entries(
      this.dairiesByDate.reduce((dairies, dairy) => {
        const date = format(dairy.addedDate!, "dd MMM yyyy");
        dairies[date] = dairies[date] ? [...dairies[date], dairy] : [dairy];
        return dairies;
      }, {} as { [key: string]: Dairy[] })
    );
  }

  loadDairies = async () => {
    this.setLoadingInitial(true);
    try {
      const dairies = await agent.Dairies.list();
      dairies.forEach((dairy) => {
        this.setDairy(dairy);
      });
      this.setLoadingInitial(false);
    } catch (error) {
      console.log(error);
      this.setLoadingInitial(false);
    }
  };

  loadDairy = async (id: string) => {
    let dairy = this.getDairy(id);
    if (dairy) {
      this.selectedDairy = dairy;
      return dairy;
    } else {
      this.setLoadingInitial(true);
      try {
        dairy = await agent.Dairies.details(id);
        this.setDairy(dairy);
        runInAction(() => {
          this.selectedDairy = dairy;
        });
        this.setLoadingInitial(false);
      } catch (error) {
        console.log(error);
        this.setLoadingInitial(false);
      }
    }
  };

  private setDairy = (dairy: Dairy) => {
    //const date = format(new Date(dairy.addedDate!), "dd MMM yyyy");
    dairy.addedDate = new Date(dairy.addedDate!);
    this.dairyRegistry.set(dairy.id, dairy);
  };

  private getDairy = (id: string) => {
    return this.dairyRegistry.get(id);
  };

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };

  createDairy = async (dairy: DairyFormValues) => {
    this.loading = true;
    try {
      await agent.Dairies.create(dairy);
      const newDairy = new Dairy(dairy);
      runInAction(() => {
        this.dairyRegistry.set(newDairy.id, newDairy);
        this.selectedDairy = newDairy;
        this.editMode = false;
      });
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  updateDairy = async (dairy: DairyFormValues) => {
    this.loading = true;
    try {
      await agent.Dairies.update(dairy);
      runInAction(() => {
        if(dairy.id) {
          const updatedDairy = { ...this.getDairy(dairy.id), ...dairy };
          this.dairyRegistry.set(dairy.id, updatedDairy as Dairy);
          this.selectedDairy = dairy as Dairy;
        }
        this.editMode = false;
      });
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  };
}
