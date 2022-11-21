import "./group-list.css";

export function GroupList() {
  return (
    <div className="group-list">
      <img className="rectangle-1" src={"assets/rectangle1.svg"} alt=""/>
      <div className="flex-container">
        <div className="group-list-1">
          <span className="menu">Menu</span>
          <div className="flex-container-1">
            <img className="icon" src={"assets/icon.png"} alt=""/>
            <span className="group-list-2">Group List</span>
          </div>
          <div className="flex-container-2">
            <img className="icon-1" src={"assets/icon1.png"} alt=""/>
            <span>Invite Member</span>
          </div>
          <div className="flex-container-3">
            <img className="icon-2" src={"assets/icon2.png"} alt=""/>
            <span className="new-group">New Group</span>
          </div>
          <div className="flex-container-4">
            <img className="icon-3" src={"assets/icon3.png"} alt=""/>
            <span className="manage-user">Manage User</span>
          </div>
          <div className="rectangle-2">
            <img className="profile-avatar" src={"assets/profileAvatar.png"} alt=""/>
            <div className="flex-container-5">
              <span className="khi-on">Khôi Đoàn</span>
              <span className="email">bbxminechan@gmail.com</span>
            </div>
          </div>
        </div>
        <div className="flex-container-6">
          <div className="flex-container-7">
            <input className="searchbox" type="text" />
            <div className="rectangle-8">
              <span className="filter">Filter:</span>
              <select className="rectangle-9">
                <option className="by-name">By Name</option>
              </select>
            </div>
          </div>
          <span className="created">Created</span>
          <div className="rectangle-6">
            <img className="group-1" src={"assets/group1.png"} alt=""/>
            <div className="flex-container-8">
              <span className="group-name-1">Group Name #1</span>
              <div className="flex-container-9">
                <img className="group-chat-1" src={"assets/groupChat1.png"} alt=""/>
                <span className="num-3-members">3 Members</span>
              </div>
              <div className="flex-container-10">
                <div className="flex-container-11">
                  <img className="avatar" src={"assets/avatar.svg"} alt=""/>
                  <img className="avatar-1" src={"assets/avatar1.svg"} alt=""/>
                  <img className="avatar-2" src={"assets/avatar2.svg"} alt=""/>
                </div>
                <span className="have-joined">have joined</span>
              </div>
            </div>
          </div>
          <div className="rectangle-7">
            <img className="group-2" src={"assets/group1.png"} alt=""/>
            <div className="flex-container-12">
              <span className="group-name-2">Group Name #2</span>
              <div className="flex-container-13">
                <img className="group-chat-1-1" src={"assets/groupChat1.png"} alt=""/>
                <span className="num-1-member">1 Member</span>
              </div>
              <div className="flex-container-14">
                <div className="flex-container-18">
                  <img className="avatar-3" src={"assets/avatar3.svg"} alt=""/>
                </div>
                <span className="has-joined">has joined</span>
              </div>
            </div>
          </div>
          <span className="joined">Joined</span>
          <div className="rectangle-4">
            <img className="group-3" src={"assets/group1.png"} alt=""/>
            <div className="flex-container-15">
              <span className="group-name-3">Group Name #3</span>
              <div className="flex-container-16">
                <img className="group-chat-1-2" src={"assets/groupChat1.png"} alt=""/>
                <span className="num-2-members">2 Members</span>
              </div>
              <div className="flex-container-17">
                <img className="avatar-4" src={"assets/avatar4.svg"} alt=""/>
                <img className="profile-avatar-1" src={"assets/profileAvatar.png"} alt=""/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
