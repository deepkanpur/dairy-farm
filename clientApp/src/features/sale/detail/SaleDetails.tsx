import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import { Grid, GridColumn, GridRow} from "semantic-ui-react";

export default observer(function SaleDetails() {
  
  const { saleRegisterStore } = useStore();
  const { saleByCustomerName: saleByVolume } = saleRegisterStore;
  let totalWeight = 0;
  saleByVolume.forEach( x => totalWeight += x.soldWeight);
  let totalSalePrice = 0;
  saleByVolume.forEach( x => totalSalePrice += (x.soldWeight * x.salePrice));

  return (
    <>
    <div style={{backgroundColor: "white"}}>      
      <Grid columns={3} celled>
        <GridRow>
          <GridColumn>
            Customer
          </GridColumn>
          <GridColumn>
            Weight
          </GridColumn>
          <GridColumn>
            Amount
          </GridColumn>
        </GridRow>

        {saleByVolume.map((saleRegister) => (          
          <GridRow key={saleRegister.id}>
            <GridColumn>
              {saleRegister.dairyFarmBusinessName}
            </GridColumn>
            <GridColumn>
              {saleRegister.soldWeight}
            </GridColumn>
            <GridColumn>
            {saleRegister.soldWeight * saleRegister.salePrice}/-
            </GridColumn>
          </GridRow>          
        ))}   
        <GridRow color='grey'>
          <GridColumn>
            Total
          </GridColumn>
          <GridColumn>
            {totalWeight}
          </GridColumn>
          <GridColumn>
            {totalSalePrice}/-
          </GridColumn>
        </GridRow> 
      </Grid>
    </div>      
    </>
  );
});
