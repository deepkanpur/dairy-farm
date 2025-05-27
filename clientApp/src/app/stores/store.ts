import React from "react";
import CommonStore from "./commonStore";
import UserStore from "./userStore";
import ModalStore from "./modalStore";
import ProfileStore from "./profileStore";
import DairyStore from "./dairyStore";
import CommentStore from "./commentStore";
import RevenueStore from "./revenueStore";
import SaleRegisterStore from "./saleRegisterStore";

interface Store {
    commonStore: CommonStore;
    userStore: UserStore;
    modalStore: ModalStore
    profileStore: ProfileStore;
    dairyStore: DairyStore;
    commentStore: CommentStore;
    revenueStore: RevenueStore;
    saleRegisterStore: SaleRegisterStore;
}

export const store: Store = {
    commonStore: new CommonStore(),
    userStore: new UserStore(),
    modalStore: new ModalStore(),
    profileStore: new ProfileStore(),
    dairyStore: new DairyStore(),
    commentStore: new CommentStore(),
    revenueStore: new RevenueStore(),
    saleRegisterStore: new SaleRegisterStore()
}

export const StoreContext = React.createContext(store);

export function useStore() {
    return React.useContext(StoreContext);
}
