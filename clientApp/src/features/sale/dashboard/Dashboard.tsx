import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import { useEffect } from "react";
import LoadingComponent from "../../../app/layout/loadingComponent";
import SaleDetails from "../detail/SaleDetails";

interface Props {
  fromDate: Date;
  toDate: Date;
  dairyFarmId?: string;
}

export default observer(function Dashboard({
  fromDate,
  toDate,
  dairyFarmId,
}: Props) {

  const { saleRegisterStore} = useStore();
  const { loadSales, loadingInitial } = saleRegisterStore;
    
  useEffect(() => {
    loadSales(fromDate, toDate, dairyFarmId);
  }, [loadSales, fromDate, toDate, dairyFarmId])

  if(loadingInitial)
    return <LoadingComponent content="Loading Sales..."/>

  return (
    <>
        {new Date(fromDate).toLocaleDateString() === new Date(toDate).toLocaleDateString() && <div> Sale Date: {new Date(toDate).toLocaleDateString()}<br/></div> }
        {new Date(fromDate).toLocaleDateString() !== new Date(toDate).toLocaleDateString() && 
            <div> Sale From: {new Date(fromDate).toLocaleDateString()} To: {new Date(toDate).toLocaleDateString()} <br/></div> }
        
        <SaleDetails/>
    </>
  );
});
