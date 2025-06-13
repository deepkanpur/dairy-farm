import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import { useEffect, useState } from "react";
import LoadingComponent from "../../../app/layout/loadingComponent";
import SaleDetails from "../detail/SaleDetails";
import DatePicker from "react-datepicker";
import { Select } from "semantic-ui-react";

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

  const { saleRegisterStore, dairyStore:{dairiesByName}} = useStore();
  const { loadSales, loadingInitial } = saleRegisterStore;
  const [localFromDate, setLocalFromDate] = useState(fromDate);
  const [localToDate, setLocalToDate] = useState(toDate);
  const [localDairyFarmId, setLocalDairyFarmId] = useState(dairyFarmId);
  const customers = dairiesByName.map(({id, businessName}) => ({key:id, value: id,  text: businessName}))

    
  useEffect(() => {
    loadSales(localFromDate, localToDate, localDairyFarmId == '' || null ? undefined : localDairyFarmId);
  }, [loadSales, localFromDate, localToDate, localDairyFarmId])

  if(loadingInitial)
    return <LoadingComponent content="Loading Sales..."/>

  return (
    <>
        {/* {new Date(localFromDate).toLocaleDateString() === new Date(localToDate).toLocaleDateString() && 
        <div> 
          Sale Date: {new Date(localToDate).toLocaleDateString()}
            <DatePicker 
              name='FromDate'
              placeholderText="From Date"
              showMonthYearPicker={true}
              value={localFromDate.toLocaleDateString()}
              onChange={a => setLocalFromDate(a!)}
            />
          <br/>
        </div> } */}
        {  /*new Date(localFromDate).toLocaleDateString() !== new Date(localToDate).toLocaleDateString() && */
            <div> 
              <div style={{display:'flex', justifyContent:'center'}}>
                <div>
              Sale From : {localFromDate.toLocaleDateString('en-in')} 
              <DatePicker 
                name='From Date'
                placeholderText="From Date"
                showMonthYearPicker={true}
                value={localFromDate.toLocaleDateString()}
                onChange={a => setLocalFromDate(a!)}
              />
              </div>
              <div>
              To: {localToDate.toLocaleDateString('en-in')} 
              <DatePicker 
                name='ToDate'
                placeholderText="To Date"
                showMonthYearPicker={false}
                value={localToDate.toLocaleDateString()}
                onChange={a => setLocalToDate(a!)}
              />
              </div>
              </div>
              <br/>
              Customer: 
              <Select 
                clearable
                value={localDairyFarmId || undefined}
                options={customers}
                onChange={(_, d) => setLocalDairyFarmId(d.value?.toString())}
            />
            </div> }

        <SaleDetails/>
    </>
  );
});
