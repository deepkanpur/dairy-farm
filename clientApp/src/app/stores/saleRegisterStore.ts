import { makeAutoObservable, runInAction } from "mobx";
import { SaleListParam, SaleRegister, SaleRegisterAddValues } from "../models/saleRegister";
import { format } from "date-fns";
import agent from "../api/agent";
import { Pagination, PagingParams } from "../models/pagination";

export default class SaleRegisterStore {
  saleRegisterRegistry = new Map<string, SaleRegister>();
  selectedSaleRegister: SaleRegister | undefined = undefined;
  editMode = false;
  loading = false;
  loadingInitial = false;
  pagination: Pagination | null = null;
  pagingParams = new PagingParams(1, 2000);

  constructor() {
    makeAutoObservable(this);
  }

  get saleRegisterByDate() {
    return Array.from(this.saleRegisterRegistry.values()).sort(
      (a, b) => b.saleDate!.getTime() - a.saleDate!.getTime()
    );
  }

  get saleByCustomerName() {
    return Array.from(this.saleRegisterRegistry.values()).sort(
      (a, b) => a.dairyFarmBusinessName.localeCompare(b.dairyFarmBusinessName)
    );
  }

  get groupedSaleRegisters() {   
    return Object.entries(
      this.saleRegisterByDate.reduce((saleRegisters, saleRegister) => {
        const date = format(saleRegister.addedDate!, "dd MMM yyyy");
        saleRegisters[date] = saleRegisters[date] ? [...saleRegisters[date], saleRegister] : [saleRegister];
        return saleRegisters;
      }, {} as { [key: string]: SaleRegister[] })
    );
  }

  axiosParams(from: Date, to: Date, dairyFarmId?: string) {
    const params : SaleListParam = {
      pageNumber: this.pagingParams.pageNumber,
      pageSize: this.pagingParams.pageSize,
      fromDate: from,
      toDate: to,
      dairyFarmId: dairyFarmId
    };
    return params;
  }

  loadSales = async (from: Date, to: Date, dairyFarmId?: string) => {
    console.log('id', dairyFarmId);
    this.setLoadingInitial(true);
    this.saleRegisterRegistry.clear();
    try {
      const result = await agent.SaleRegisters.list(this.axiosParams(from, to, dairyFarmId));
      result.data.forEach((saleRegister) => {
        this.setSaleRegister(saleRegister);
      });
      this.setPagination(result.pagination);
      this.setLoadingInitial(false);      
    } catch (error) {
      console.log(error);
      this.setLoadingInitial(false);
    }
  };

  setPagination = (pagination: Pagination) => {
    this.pagination = pagination;
  }

  setPagingParams = (pagingParams: PagingParams) => {
    this.pagingParams = pagingParams;
  }

  loadSaleRegister = async (id: string) => {
    let saleRegister = this.getSaleRegister(id);
    if (saleRegister) {
      this.selectedSaleRegister = saleRegister;
      return saleRegister;
    } else {
      this.setLoadingInitial(true);
      try {
        saleRegister = await agent.SaleRegisters.details(id);
        this.setSaleRegister(saleRegister);
        runInAction(() => {
          this.selectedSaleRegister = saleRegister;
          this.setLoadingInitial(false);
        });
      } catch (error) {
        console.log(error);
        this.setLoadingInitial(false);
      }
    }
  };

  private setSaleRegister = (saleRegister: SaleRegister) => {
    //const date = format(new Date(saleRegister.addedDate!), "dd MMM yyyy");
    saleRegister.saleDate = new Date(saleRegister.saleDate!);
    this.saleRegisterRegistry.set(saleRegister.id, saleRegister);
  };

  private getSaleRegister = (id: string) => {
    return this.saleRegisterRegistry.get(id);
  };

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };

  addSaleRegister = async (saleRegister: SaleRegisterAddValues) => {
    this.loading = true;
    try {
      const newSaleRegister = await agent.SaleRegisters.create(saleRegister);
      // const newSaleRegister = new SaleRegister(newSaleRegister);
      this.setSaleRegister(newSaleRegister);
      runInAction(() => {
        this.selectedSaleRegister = newSaleRegister;
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  updateSaleRegister = async (saleRegister: SaleRegisterAddValues) => {
    this.loading = true;
    try {
      await agent.SaleRegisters.update(saleRegister);
      runInAction(() => {
        if(saleRegister.id) {
          const updatedSaleRegister = { ...this.getSaleRegister(saleRegister.id), ...saleRegister };
          this.saleRegisterRegistry.set(saleRegister.id, updatedSaleRegister as unknown as SaleRegister);
          this.selectedSaleRegister = saleRegister as unknown as SaleRegister;
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

  clearSelectedSaleRegister = () => {
    this.selectedSaleRegister = undefined;
  };
}
