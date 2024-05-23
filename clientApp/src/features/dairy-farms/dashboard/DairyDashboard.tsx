import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import { useEffect, useState } from "react";
import { Button, Grid, Icon, Loader } from "semantic-ui-react";
import DairyList from "./DairyList";
import LoadingComponent from "../../../app/layout/loadingComponent";
import { PagingParams } from "../../../app/models/pagination";
import InfiniteScroll from "react-infinite-scroller";

export default observer(function DairyDashboard() {
  const { dairyStore } = useStore();
  const { loadDairies, dairyRegistry, setPagingParams, pagination } =
    dairyStore;
  const [loadingNext, setLoadingNext] = useState(false);

  function handleGetNext() {
    setLoadingNext(true);
    setPagingParams(
      new PagingParams(pagination!.currentPage + 1, pagination!.itemsPerPage)
    );
    loadDairies().then(() => setLoadingNext(false));
  }

  useEffect(() => {
    if (dairyRegistry.size <= 1) loadDairies();
  }, [loadDairies, dairyRegistry.size]);

  if (dairyStore.loadingInitial && dairyRegistry.size === 0 && !loadingNext)
    return <LoadingComponent content="Loading Dairies..." />;

  return (
    <Grid>
      <Grid.Column width="16" textAlign='center'>
        <Button onClick={loadDairies}>
          <Icon name='play' />
        </Button>
      </Grid.Column>
      <Grid.Column width="16">
        <InfiniteScroll
          pageStart={0}
          loadMore={handleGetNext}
          hasMore={
            !loadingNext &&
            !!pagination &&
            pagination.currentPage < pagination.totalPages
          }
          initialLoad={false}
        >
          <DairyList />
        </InfiniteScroll>
      </Grid.Column>
      <Grid.Column width="16" textAlign='center'>
        <Loader active={loadingNext} />
      </Grid.Column>
    </Grid>
  );
});
