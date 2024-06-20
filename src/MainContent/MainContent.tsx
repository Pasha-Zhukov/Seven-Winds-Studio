import { useEffect } from "react";
import { useFetchEntityDataQuery } from "../Redux/api";
import { item } from "../shared/interfaces/item.interface";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { dataList, disableButton } from "../Redux/appStateSlice";
import { AppState } from "../Redux/redux.types";

import ChildMainContent from "../components/ChildMainContent";
import createRowLocal from "./MainContent.service";
import Error from "../components/Error/Error";

import "./MainContent.style.scss";

const MainContent = () => {
  const { data, isFetching, error: errorFetch } = useFetchEntityDataQuery(null);

  const allData = useSelector(
    (state: { appState: AppState }) => state.appState.dataList
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (data?.length == 0) {
      createRowLocal(0, allData, dispatch, dataList, disableButton);
    } else {
      dispatch(dataList(data));
    }
  }, [data]);

  if (errorFetch) {
    return <Error error={"что-то пошло не так, попробуйте позже"} />;
  }

  return (
    <div className="wrapper-main">
      {isFetching ? (
        <div className="loading">
          <div>Loading...</div>
        </div>
      ) : (
        <div className="list-expenses">
          <Table>
            <thead>
              <tr>
                <th>Уровень</th>
                <th>Наименование работ</th>
                <th>Основная з/п</th>
                <th>Оборудование</th>
                <th>Накладные расходы</th>
                <th>Сметная прибыль</th>
              </tr>
            </thead>
            {allData?.map((item: item) => (
              <ChildMainContent key={item.id} item={item} nestingLevel={0} />
            ))}
          </Table>
        </div>
      )}
    </div>
  );
};

export default MainContent;
