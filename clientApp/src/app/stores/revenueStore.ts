import { makeAutoObservable, runInAction } from "mobx";
import { Revenue, RevenueAddValues } from "../models/revenue";
import { format } from "date-fns";
import agent from "../api/agent";
import { Pagination, PagingParams } from "../models/pagination";

export default class RevenueStore {
  revenueRegistry = new Map<string, Revenue>();
  selectedRevenue: Revenue | undefined = undefined;
  editMode = false;
  loading = false;
  loadingInitial = false;
  pagination: Pagination | null = null;
  pagingParams = new PagingParams();

  constructor() {
    makeAutoObservable(this);
  }

  get revenueByDate() {
    return Array.from(this.revenueRegistry.values()).sort(
      (a, b) => b.addedDate!.getTime() - a.addedDate!.getTime()
    );
  }

  get groupedRevenues() {   
    return Object.entries(
      this.revenueByDate.reduce((revenues, revenue) => {
        const date = format(revenue.addedDate!, "dd MMM yyyy");
        revenues[date] = revenues[date] ? [...revenues[date], revenue] : [revenue];
        return revenues;
      }, {} as { [key: string]: Revenue[] })
    );
  }

  get axiosParams() {
    const params = new URLSearchParams();
    params.append('pageNumber', this.pagingParams.pageNumber.toString());
    params.append('pageSize', this.pagingParams.pageSize.toString());
    return params;
  }

  loadRevenues = async () => {
    this.setLoadingInitial(true);
    try {
      const result = await agent.Revenues.list(this.axiosParams);
      result.data.forEach((revenue) => {
        this.setRevenue(revenue);
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

  loadRevenue = async (id: string) => {
    let revenue = this.getRevenue(id);
    if (revenue) {
      this.selectedRevenue = revenue;
      return revenue;
    } else {
      this.setLoadingInitial(true);
      try {
        revenue = await agent.Revenues.details(id);
        this.setRevenue(revenue);
        runInAction(() => {
          this.selectedRevenue = revenue;
          this.setLoadingInitial(false);
        });
      } catch (error) {
        console.log(error);
        this.setLoadingInitial(false);
      }
    }
  };

  private setRevenue = (revenue: Revenue) => {
    //const date = format(new Date(revenue.addedDate!), "dd MMM yyyy");
    revenue.addedDate = new Date(revenue.addedDate!);
    this.revenueRegistry.set(revenue.id, revenue);
  };

  private getRevenue = (id: string) => {
    return this.revenueRegistry.get(id);
  };

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };

  addRevenue = async (revenue: RevenueAddValues) => {
    this.loading = true;
    try {
      const newRevenue = await agent.Revenues.create(revenue);
      // const newRevenue = new Revenue(revenue);
      this.setRevenue(newRevenue);
      runInAction(() => {
        this.selectedRevenue = newRevenue;
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

  updateRevenue = async (revenue: RevenueAddValues) => {
    this.loading = true;
    try {
      await agent.Revenues.update(revenue);
      runInAction(() => {
        if(revenue.id) {
          const updatedRevenue = { ...this.getRevenue(revenue.id), ...revenue };
          this.revenueRegistry.set(revenue.id, updatedRevenue as unknown as Revenue);
          this.selectedRevenue = revenue as unknown as Revenue;
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

  clearSelectedRevenue = () => {
    this.selectedRevenue = undefined;
  };
}
