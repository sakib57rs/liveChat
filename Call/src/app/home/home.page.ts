import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CometChat } from "@cometchat-pro/chat";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild("myDiv",{static:false}) divView: ElementRef;
  constructor() {}


  ngOnInit(){
    //this.commetChat()
  }
  commetChat(){
    var appId = "83818cb74c5968";
    CometChat.init(appId).then(
      () => {
        console.log("Initialization completed successfully");
        this.auth()
      },
      error => {
        console.log("Initialization failed with error:", error);
        //Check the reason for error and take apppropriate action.
      }
    );
  }

  auth(){
    var UID = "SUPERHERO1";
    var apiKey = "e006a63c57445c7c3b0e3219240560b1614494a4";

    CometChat.login(UID, apiKey).then(
      User => {
        console.log("Login Successful:", { User });
        //this.createGroup()
        //this.addMember()
        this.initCall();

        this.getGroupInfo()
      },
      error => {
        console.log("Login failed with exception:", { error });
        // User login failed, check error and take appropriate action.
      }
    );
  }

  initCall(){
    var receiverID = 'guid1';
    
    var callType = CometChat.CALL_TYPE.VIDEO;
    var receiverType = CometChat.RECEIVER_TYPE.GROUP;

    var call = new CometChat.Call(receiverID, callType, receiverType);

    CometChat.initiateCall(call).then(
      outGoingCall => {
        console.log("Call  successfully:", outGoingCall);
        // perform action on success. Like show your calling screen.
        //this.startCall()
        
        this.receiveCall()
        console.log('div_view',this.divView);
      },
      error => {
        console.log("Call initialization faileinitiatedd with exception:", error);
      }
    );
  }

  receiveCall(){
    let that = this
    console.log("in receive call")
    var listnerID = "1233333rrerr";
    CometChat.addCallListener(
    listnerID,
    new CometChat.CallListener({
      // onIncomingCallReceived(call) {
      // console.log("Incoming call:", call);
      // // Handle incoming call
      // },
      onOutgoingCallAccepted(call) {
      console.log("Outgoing call accepted:", call);
      // Outgoing Call Accepted
      console.log('Accepted',call.sessionId)
          that.startCall(call.sessionId)
      },
      // onOutgoingCallRejected(call) {
      // console.log("Outgoing call rejected:", call);
      // // Outgoing Call Rejected
      // },
      // onIncomingCallCancelled(call) {
      // console.log("Incoming call calcelled:", call);
      // }
    })
    );
  }

  createGroup(){
    var GUID = "GUID2";
    var groupName = "Hello Group!";
    var groupType = CometChat.GROUP_TYPE.PUBLIC;
    var password = "";

    var group = new CometChat.Group(GUID, groupName, groupType, password);

    CometChat.createGroup(group).then(
      group => {
        console.log("Group created successfully:", group);
        //this.initCall(group.guid);
      },
      error => {
        console.log("Group creation failed with exception:", error);
      }
    );
  }

  addMember(){
    let GUID="GUID1";
    let membersList=[
      new CometChat.GroupMember("superhero1",CometChat.GROUP_MEMBER_SCOPE.PARTICIPANT),
    ];

    CometChat.addMembersToGroup(GUID,membersList,[]).then(response=>{
      console.log("response",response);
    },error=>{
      console.log("Something went wrong",error);
    });
  }

  getGroupInfo(){
    var GUID = "GUID1";
    CometChat.getGroup(GUID).then(
    group => {
      console.log("Group details fetched successfully:", group);
    },
    error => {
      console.log("Group details fetching failed with exception:", error);
    }
    );
  }

  startCall(session_id){
    console.log('In start call')
    console.log('Param',session_id)
    var sessionID = session_id;

    CometChat.startCall(
    sessionID,
    this.divView.nativeElement,
    new CometChat.OngoingCallListener({
      onUserJoined: user => {
      /* Notification received here if another user joins the call. */
      console.log("User joined call:", user);
      /* this method can be use to display message or perform any actions if someone joining the call */
      },
      onUserLeft: user => {
      /* Notification received here if another user left the call. */
      console.log("User left call:", user);
      /* this method can be use to display message or perform any actions if someone leaving the call */
      },
      onCallEnded: call => {
      /* Notification received here if current ongoing call is ended. */
      console.log("Call ended:", call);
      /* hiding/closing the call screen can be done here. */
      }
    })
    );
  }
}
