import React from "react";
import { Link } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import moment from "moment";
import { Layout, Icon, Badge, Dropdown, Menu, Typography } from "antd";
import * as actionCreator from "../../../Store/action/index";
import "./header.css";
import logo2 from "../../../assets/header-logo.svg";
const { Header } = Layout;
const { Text } = Typography;

// const makeNotificationList = props => {
//   const {
//     currentUid,
//     notification,
//     notificationArray,
//     notifyUser,
//     notifyUserArray
//   } = props;
//   const filterNotify =
//     notification &&
//     notificationArray.filter(element => {
//       const { id } = element;
//       const checkNotifyUser = notifyUser[id] && notifyUser[id][currentUid];
//       return checkNotifyUser ? true : false;
//     });
//   const combineNotifyObject =
//     filterNotify &&
//     filterNotify.map(element => {
//       const objSeen = notifyUserArray.find(ele => {
//         return ele.id === element.id;
//       })[currentUid];
//       return Object.assign(element, {
//         ...objSeen
//       });
//     });
//   if (combineNotifyObject) {
//     return (
//       <Menu style={{ width: 300, padding: "6px" }}>
//         {combineNotifyObject &&
//           combineNotifyObject.map(obj => {
//             return (
//               <Menu.Item key={obj.id}>
//                 <Link to={`/blog-detail/${obj.notifyID}`}>
//                   {/* <Card style={{ width: 300, padding: "6px" }}>

//                 </Card> */}
//                   <h4>
//                     <Text type="warning">{obj.content}</Text>
//                   </h4>
//                   <Text>Blog by {obj.user}</Text>
//                 </Link>
//               </Menu.Item>
//             );
//           })}
//       </Menu>
//     );
//   } else {
//     return <ul></ul>;
//   }
// };
const HeaderComp = props => {
  const { collapsed, setCollapsed, isAuthenticated } = props;
  let countNotify = 0;
  let notificationList = (
    <Menu>{isAuthenticated ? <Menu.Item key="0"></Menu.Item> : ""}</Menu>
  );
  const makeNotificationList = () => {
    const {
      currentUid,
      notification,
      notificationArray,
      notifyUser,
      notifyUserArray,
      SeenedNotification
    } = props;
    const filterNotify =
      notification &&
      notificationArray.filter(element => {
        const { id } = element;
        const checkNotifyUser =
          notifyUser && notifyUser[id] && notifyUser[id][currentUid];
        return checkNotifyUser ? true : false;
      });
    const combineNotifyObject =
      filterNotify &&
      filterNotify.map(element => {
        const objSeen = notifyUserArray.find(ele => {
          return ele.id === element.id;
        })[currentUid];
        return Object.assign(element, {
          ...objSeen
        });
      });
    if (combineNotifyObject) {
      countNotify = combineNotifyObject.filter(obj => obj.seen === false)
        .length;
      return (
        <Menu
          style={{
            width: 220,
            padding: "6px",
            overflow: "hidden scroll",
            // overflowX: "hidden",
            height: "280px"
          }}
        >
          {combineNotifyObject &&
            combineNotifyObject.map(obj => {
              return (
                <Menu.Item key={obj.id}>
                  <Link
                    to={`/blog-detail/${obj.notifyID}`}
                    onClick={() =>
                      SeenedNotification({
                        notifyUserID: obj.id,
                        uid: props.currentUid
                      })
                    }
                  >
                    <h4>
                      {!obj.seen ? (
                        <Badge status="processing" color="#f5222d" />
                      ) : null}
                      <Text type="warning" style={{ color: "#096dd9" }}>
                        {obj.content}
                      </Text>
                    </h4>
                    <Text>Blog by {obj.user}</Text>
                    <h5>
                      <Text type="secondary">
                        {moment(obj.time.toDate()).calendar()}
                      </Text>
                    </h5>
                  </Link>
                </Menu.Item>
              );
            })}
        </Menu>
      );
    } else {
      return (
        <Menu>
          {isAuthenticated ? (
            <Menu.Item key="0">No New Notification</Menu.Item>
          ) : (
            ""
          )}
        </Menu>
      );
    }
  };
  notificationList = makeNotificationList();
  return (
    <Header className="Header">
      <span
        style={{ fontSize: "24px" }}
        onClick={() => setCollapsed(!collapsed)}
      >
        <Icon type="align-right" />
      </span>
      <img src={logo2} alt="Logo" style={{ width: "120px" }} />

      <Dropdown overlay={notificationList} trigger={["click"]}>
        <Badge
          // status={countNotify ? "processing" : ""}
          count={countNotify}
          style={{
            // position: "absolute",
            // overflow: "unset",
            // width: "10px",
            // height: "10px",
            backgroundColor: "#4c96d7"
          }}
          // offset={[-1, 17]}
        >
          <Icon type="notification" style={{ fontSize: "24px" }} />
        </Badge>
      </Dropdown>
    </Header>
  );
};

const mapStateToProps = (
  { firestoreReducer: { ordered, data }, firebaseReducer, authReducer },
  props
) => {
  return {
    notificationArray: ordered.notifications,
    notification: data.notifications,
    notifyUserArray: ordered.notifyUser,
    notifyUser: data.notifyUser,
    isAuthenticated: !firebaseReducer.auth.isEmpty,
    currentUid: firebaseReducer.auth.uid,
    seened: authReducer.seened
  };
};

const mapDispatchToProps = dispatch => {
  return {
    SeenedNotification: data => dispatch(actionCreator.seenNotification(data))
  };
};

export default compose(
  firestoreConnect(props => {
    // const { isAuthenticated } = props;
    return [
      { collection: "notifyUser", orderBy: ["time", "desc"] },
      { collection: "notifications", orderBy: ["time", "desc"] }
    ];
  }),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(HeaderComp);
