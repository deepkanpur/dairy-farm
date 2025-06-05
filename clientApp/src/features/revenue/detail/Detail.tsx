import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import { useStore } from "../../../app/stores/store";
import { useEffect } from "react";
import LoadingComponent from "../../../app/layout/loadingComponent";
import { Table } from "semantic-ui-react";
import Dashboard from "../../sale/dashboard/Dashboard";

export default observer(function Details() {
  const { revenueStore, userStore: { user } } = useStore();
  const {
    selectedRevenue: revenue,
    loadRevenue,
    loadingInitial,
    clearSelectedRevenue,
  } = revenueStore;

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) loadRevenue(id)
    return () => revenueStore.clearSelectedRevenue();
  }, [id, loadRevenue, clearSelectedRevenue, revenueStore, revenue]);

  if (loadingInitial || !revenue)
    return <LoadingComponent content="Loading Revenue Detail..." />;

  return (
    <>
      <Table definition>
        <Table.Body>
          <Table.Row negative={!revenue.reconciled}>
            <Table.Cell width={3}>Sale Date:</Table.Cell>
            <Table.Cell>{new Date(revenue.saleDate).toDateString()}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Cultivated Weight:</Table.Cell>
            <Table.Cell>{revenue.cultivatedWeight} KG</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Sold:</Table.Cell>
            <Table.Cell>{revenue.soldWeight} KG</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Sample:</Table.Cell>
            <Table.Cell>{revenue.sampleWeight} KG</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Donated:</Table.Cell>
            <Table.Cell>{revenue.donateWeight} KG</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Wastage:</Table.Cell>
            <Table.Cell>{revenue.wastage} KG</Table.Cell>
          </Table.Row>
          {(user?.isAdmin || user?.isSalesUser) && (
            <>
              <Table.Row>
                <Table.Cell>Sale Price:</Table.Cell>
                <Table.Cell>{revenue.salePrice} Per KG</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Revenue:</Table.Cell>
                <Table.Cell>
                  {revenue.salePrice * revenue.soldWeight} /- Rupees
                </Table.Cell>
              </Table.Row>
            </>
          )}
          <Table.Row>
            <Table.Cell>Remark:</Table.Cell>
            <Table.Cell>{revenue.remark}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Added By:</Table.Cell>
            <Table.Cell>{revenue.addedByUserName}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Added Date:</Table.Cell>
            <Table.Cell>
              {new Date(revenue.addedDate).toDateString()}
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>

      <Dashboard fromDate={revenue.saleDate} toDate={revenue.saleDate}/>
    </>
  );
});
