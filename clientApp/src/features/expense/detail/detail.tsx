import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";

export default observer(function Details() {
  const { id } = useParams<{ id: string }>();
  
  return (
    <>
        Welcome to expense details : {id}
    </>
  );
});
