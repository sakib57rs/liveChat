import { Component, OnInit, ElementRef, ViewChild  } from '@angular/core';
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
    this.commetChat()
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
    var UID = "superhero2";
    var apiKey = "e006a63c57445c7c3b0e3219240560b1614494a4";

    CometChat.login(UID, apiKey).then(
      User => {
        console.log("Login Successful:", { User });
        this.receiveCall()
        
      },
      error => {
        console.log("Login failed with exception:", { error });
        // User login failed, check error and take appropriate action.
      }
    );
  }


  receiveCall(){
    let that = this
    console.log("in receive call")
    var listnerID = "2323dsd343";
    CometChat.addCallListener(
    listnerID,
    new CometChat.CallListener({
      onIncomingCallReceived(call) {
      console.log("Incoming call:", call);
      // Handle incoming call
         console.log('Received successfully',call.sessionId)
          that.acceptCall(call.sessionId)
          
            
        
      },
      // onOutgoingCallAccepted(call) {
      // console.log("Outgoing call accepted:", call);
      // // Outgoing Call Accepted
      // },
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

  acceptCall(session_id){
    var sessionID = session_id;

    CometChat.acceptCall(sessionID).then(
    call => {
      console.log("Call accepted successfully:", call);
        //start the call using the startCall() method
      this.startCall(session_id)
    },
    error => {
      console.log("Call acceptance failed with error", error);
      
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
