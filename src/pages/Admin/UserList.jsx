import "./UserList.scss";
import "tui-grid/dist/tui-grid.css";
import Grid from "@toast-ui/react-grid";
import { useAxios } from "../../hooks/useAxios.js";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

const UserList = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [instance, setInstance] = useState("");
  const gridRef = useRef();

  const { response } = useAxios({
    method: "get",
    url: `/admin/user-list`,
  });

  const columns = [
    { name: "name", header: "이름", sortable: true },

    { name: "username", header: "아이디" },
    { name: "email", header: "이메일" },
    {
      name: "isAdmin",
      header: "권한",
      // formatter: "listItemText",
      editor: {
        type: "select",
        options: {
          listItems: [
            { text: "0", value: 0 },
            { text: "1", value: 1 },
          ],
        },
      },
      onAfterChange: (ev) => {
        instance.check(ev.rowKey);
      },
      width: 40,
    },
    { name: "address1", header: "주소", width: 300 },
    { name: "address2", header: "상세주소" },
  ];

  const handleClick = async () => {
    if (instance.getCheckedRows().length < 1) {
      alert("주문 상품을 선택 해주세요.");
      return;
    } else {
      await axios
        .patch(
          "https://tennis365-api.herokuapp.com/admin/user-list",
          instance.getCheckedRows()
        )
        .then((res) => {
          alert("업데이트 됐습니다");
          instance.uncheckAll();
        });
    }
  };

  useEffect(() => {
    if (response) {
      setAllUsers(response);
    }
  }, [response, allUsers]);

  useEffect(() => {
    // const instance = gridRef.current.getInstance();
    if (gridRef) {
      setInstance(gridRef.current.getInstance());
    }
  }, [instance]);

  return (
    <section className="user-list" style={{ margin: "0 auto" }}>
      <div className="user-grid">
        <Grid
          ref={gridRef}
          data={allUsers}
          columns={columns}
          // rowHeight={25}
          // bodyHeight={100}
          heightResizable={true}
          rowHeaders={["checkbox"]}
          width={1000}
          columnOptions={{ resizable: true }}
          onCheck={() => {
            instance.getCheckedRows();
          }}
        />
      </div>
      <button onClick={handleClick}>테스트</button>
    </section>
  );
};

export default UserList;
