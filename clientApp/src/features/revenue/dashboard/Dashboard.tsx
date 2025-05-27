import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { Button, Grid, Icon, Loader } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { useEffect, useState } from "react";
import { PagingParams } from "../../../app/models/pagination";
import LoadingComponent from "../../../app/layout/loadingComponent";
import InfiniteScroll from "react-infinite-scroller";
import List from "./List";

export default observer(function Dashboard() {
  const { revenueStore} = useStore();
  const { loadRevenues, revenueRegistry, setPagingParams, pagination, loading } = revenueStore;
  const [loadingNext, setLoadingNext] = useState(false);
  
  function handleGetNext() {
    setLoadingNext(true);
    setPagingParams(
      new PagingParams(pagination!.currentPage + 1, pagination!.itemsPerPage)
    );
    loadRevenues().then(()=> setLoadingNext(false));
  }

  useEffect(() => {
    if(revenueRegistry.size <= 1) loadRevenues();
  }, [loadRevenues, revenueRegistry.size])

  if(revenueStore.loadingInitial && revenueRegistry.size === 0 && !loadingNext)
    return <LoadingComponent content="Loading Revenues..."/>


  return (
    <Grid>
      <Grid.Column width="8" textAlign='left'>
        <Button onClick={loadRevenues} disabled={loading}>
          <Icon name='play' />
        </Button>        
      </Grid.Column>
      <Grid.Column width={8} textAlign="right">
        <Button width="8" text>
        <Link to={`add`}><Icon name='plus' /></Link>
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
         <List />
        </InfiniteScroll>
      </Grid.Column>
      <Grid.Column width="16" textAlign='center'>
        <Loader active={loadingNext} />
      </Grid.Column>
    </Grid>
  );
});
