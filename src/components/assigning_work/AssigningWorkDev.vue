<template lang="html">
  <div>
    <p>AssigningWork</p>
    <meeting-info v-bind:meeting_info="meeting_info"> </meeting-info>
    <table>
      <tr>
        <th>出席確認</th>
        <th>先決め first_choice</th>
        <th>ランダム決め second_choice</th>
      </tr>
      <tr>
        <!--
        出席確認
        -->
        <td valign="top">
          <check-attendance-list
            v-bind:all_members="all_members"
            v-bind:member_info_list="member_info_list"
          >
          </check-attendance-list>
        </td>
        <!--
        仕事 first_choice
        -->
        <td valign="top">
          <first-choice-work-list
            v-bind:all_works="all_works"
            v-bind:member_info_list="member_info_list"
            v-bind:selectable_members="selectable_members"
          >
          </first-choice-work-list>
        </td>
        <!--
        仕事 second_choice
        -->
        <td valign="top">
          <second-choice-work-list
            v-bind:all_works="all_works"
            v-bind:member_info_list="member_info_list"
            v-bind:meeting_info="meeting_info"
          >
          </second-choice-work-list>
        </td>
      </tr>
    </table>

    <button v-on:click="showAllMembers" />
    <button v-on:click="showAllMemberInfo" />
    <!--
    <attending-member-list
      v-bind:member-list="attending_members"
    ></attending-member-list>
    <assigned-work-list
      v-bind:member_info_list="member_info_list"
      v-bind:all_works="all_works"
    >
    </assigned-work-list>
    -->
    <assigned-work-text
      v-bind:member_info_list="member_info_list"
      v-bind:all_works="all_works"
    >
    </assigned-work-text>
  </div>
</template>

<script>
// todo: 本番前は以下を消す
import member_info_list_json from "@/assets/member_info_list.json";
import all_members_json from "@/assets/all_members.json";
import all_works_json from "@/assets/all_works.json";

import MeetingInfo from "@/components/assigning_work/MeetingInfo";
import CheckAttendanceList from "@/components/assigning_work/CheckAttendanceList";
import AttendingMemberList from "@/components/assigning_work/AttendingMemberList";
import FirstChoiceWorkList from "@/components/assigning_work/FirstChoiceWorkList";
import SecondChoiceWorkList from "@/components/assigning_work/SecondChoiceWorkList";
import AssignedWorkList from "@/components/assigning_work/AssignedWorkList";
import AssignedWorkText from "@/components/assigning_work/AssignedWorkText";

import {
  arrayShuffle,
  compareValues,
  compareDeepValues
} from "@/assets/js/function_of_member_info_list.js";

import db from "@/firebaseInit";
export default {
  components: {
    MeetingInfo,
    CheckAttendanceList,
    AttendingMemberList,
    FirstChoiceWorkList,
    SecondChoiceWorkList,
    AssignedWorkList,
    AssignedWorkText
  },
  data: function() {
    return {
      meeting_info: {
        meeting_num: 0,
        place: "",
        start_time: "",
        end_time: "",
        date: ""
      },
      all_members: all_members_json,
      all_works: all_works_json,
      //member_info_list: [] // 過去の当番回数情報
      member_info_list: member_info_list_json, // 過去の当番回数情報
      option_members: [] // member_info_list_json.slice()
    };
  },
  watch: {},
  computed: {
    option_member_list: function() {
      let option_member_list = this.member_info_list.filter(member_info => {
        return member_info.attendance === "o"
          ? true
          : member_info.attendance === "l"
          ? true
          : false;
      });
      return option_member_list;
    },
    attending_members: function() {
      return this.member_info_list.filter(member_info => {
        switch (member_info.attendance) {
          case "o":
          case "e":
          case "l":
            return true;
          default:
            return false;
        }
      });
    },
    selectable_members: function() {
      return this.member_info_list
        .filter(member_info => {
          switch (member_info.attendance) {
            case "o":
            case "l":
              return true;
            default:
              return false;
          }
        })
        .filter(member_info => {
          return member_info.assigned_work === "";
        });
    },
    recommend_members_by_work: function(work_id) {
      let recommend_members_by_work = this.selectable_members;
      arrayShuffle(recommend_members_by_work);
      arrayShuffle(recommend_members_by_work);
      arrayShuffle(recommend_members_by_work);
      return recommend_members_by_work
        .sort(compareValues("work_count"))
        .sort(compareDeepValues("work_count_by_category", "work_id"));
    },
    selected_members_by_work: function(work_id) {
      return this.member_info_list.filter(member_info => {
        return member_info.assigned_work_id === work_id;
      });
    }
  },
  created() {
    const today_date = new Date();
    console.log(today_date);
    this.meeting_info.date =
      today_date.toLocaleDateString() + "_" + today_date.toLocaleTimeString();
    console.log(this.meeting_info.date);
    this.meeting_info.start_time = today_date
      .toLocaleTimeString()
      .split(":")
      .splice(0, 2)
      .join(":");
    this.all_members = arrayShuffle(this.all_members);
    this.all_members = arrayShuffle(this.all_members);
    this.all_members = arrayShuffle(this.all_members);
    this.all_members
      .sort(compareValues("stu_num"))
      .sort(compareValues("grade")); // 学籍番号でソートしたのち、学年でソート
    this.all_members.sort(compareValues("stu_num"));
    this.member_info_list.sort(compareValues("stu_num"));
    this.option_members = Array.from(this.member_info_list).map(obj => {
      return Object.create(obj);
    });
    // ユーザ情報
    let all_members = [];
    // todo: 以下を消してdbのところに移す
    let all_stu_nums = [];
    this.all_members.forEach(member => {
      all_stu_nums.push(member.stu_num);
    });

    //    db.collection("members")
    //      .get()
    //      .then(snapshot => {
    //        snapshot.forEach(doc => {
    //          //all_members[doc.id] = doc.data();
    //          all_members.push(doc.data());
    //          console.log(doc.id, "=>", doc.data());
    //        });
    //      })
    //      .catch(err => {
    //        console.log("Error getting documents", err);
    //      });
    //    this.all_members = all_members;
    //    console.log("created!!");
    // 仕事
    let all_works = [];
    // todo: 以下を消してdbのところに移す
    let work_ids = [];
    this.all_works.forEach(work => {
      work_ids.push(work.work_id);
      work["first_choiced_members"] = [];
      work["second_choiced_members"] = [];
    });
    delete this.all_works["__ob__"];
    //db.collection("works")
    //  .get()
    //  .then(snapshot => {
    //    snapshot.forEach(doc => {
    //      //all_works[doc.id] = doc.data();
    //      work_ids.push(doc.id);
    //      all_works.push(doc.data());
    //      console.log(doc.id, "=>", doc.data());
    //    });
    //  })
    //  .catch(err => {
    //    console.log("Error getting documents", err);
    //  });
    //this.all_works = all_works;
    let member_info_list = [];
    let member_info_dic = {};

    // メンバーの過去の情報と今回の情報を初期化
    for (const member of this.all_members) {
      member_info_dic[member.stu_num] = {
        name: member.name,
        grade: member.grade,
        priority: member.priority,
        stu_num: member.stu_num,
        attendance: "x",
        work: "",
        work_id: "",
        work_count: 0,
        attendance_by_category: {
          o: 0,
          l: 0,
          e: 0,
          x: 0,
          "-": 0
        },
        work_count_by_category: {
          work98: 0 // その他
        }
      };
      for (const work of this.all_works) {
        member_info_dic[member.stu_num]["work_count_by_category"][
          work.work_id
        ] = 0;
      }
    }

    //axios
    //  .get("/assets/member_info_list.json")
    //  .then(response => (this.member_info_list = response));
    /*
    db.collection("past_meeting")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          for (const stu_num of Object.keys(
            doc.data()["attendance_by_member"]
          )) {
            const member_info = doc.data()["attendance_by_member"][stu_num];
            // const stu_num = member_info.stu_num;
            if (all_stu_nums.indexOf(stu_num) === -1) {
              console.log(stu_num + " この人は今いません");
              continue;
            }
            // todo: 出席、work_idを追加 work_id == ''

            // 過去の出席状況
            member_info_dic[stu_num]["attendance_by_category"][
              member_info.attendance
            ] += 1;

            // 過去の当番経験
            const work_id = member_info.work_id;
            if (work_id === "") {
              // 仕事なし
              // pass
            } else if (work_ids.indexOf(work_id !== -1)) {
              member_info_dic[stu_num]["work_count"]++;
              member_info_dic[stu_num]["work_count_by_category"][work_id]++;
            } else {
              member_info_dic[stu_num]["work_count"]++;
              member_info_dic[stu_num]["work_count_by_category"]["work98"]++; // その他
            }
          }
        });
      })
      .then(msg => {
        this.member_info_list = member_info_list;
        this.member_info_list = arrayShuffle(this.member_info_list);
        this.member_info_list = arrayShuffle(this.member_info_list);
        this.member_info_list = arrayShuffle(this.member_info_list);
        this.member_info_list.sort(compareValues("grade"));
        this.member_info_list.sort(compareValues("stu_num", "desc"));
        this.member_info_list.sort(compareValues("work_count", "desc"));
        this.member_info_list.sort(
          compareDeepValues("work_count_by_category", "work07", "desc")
        );
      })
      .catch(err => {
        console.log("Error getting documents", err);
      });
    for (const key of Object.keys(member_info_dic)) {
      member_info_list.push(member_info_dic[key]);
    }
    //this.member_info_list.sort(
    //  compareDeepValues("work_count_by_category", "work03")
    //);
    */
  },
  methods: {
    showAllMembers: function() {
      console.log(this.all_members);
      //      this.all_members.forEach(member => {
      //        console.log(member);
      //      });
      //      db.collection("members")
      //      .get()
      //      .then(snapshot => {
      //        snapshot.forEach(doc => {
      //          console.log(doc.id, "=>", doc.data());
      //        });
      //      })
      //      .catch(err => {
      //        console.log("Error getting documents", err);
      //      });
    },
    showAllMemberInfo: function() {
      console.log(JSON.stringify(this.member_info_list, null, "    "));
    }
  }
};
</script>

<style lang="css" scoped></style>
