<template lang="html">
  <div class="container">
    <section class="hero is-primary">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">AssigningWork</h1>
          <h2 class="subtitle">出席確認＋当番割り当て</h2>
        </div>
      </div>
    </section>

    <!--
        目次
    -->
    <section class="section">
      <div class="container" align="center">
        <h1 class="title">0. 目次</h1>
        <div class="content">
          <div class="columns is-mobile is-centered">
            <div class="column is-narrow">
              <ol type="1" start="0" align="left">
                <li>目次</li>
                <li>会議の情報</li>
                <li>出席確認</li>
                <li>指名決め</li>
                <li>ランダム決め</li>
                <li>出席と当番の確認</li>
                <li>今日の会議情報の保存</li>
              </ol>
            </div>
          </div>
        </div>
        <hr />
      </div>
    </section>

    <!--
        会議の情報
    -->
    <section class="section">
      <div class="container" align="center">
        <h1 class="title">1. 会議の情報</h1>
        <meeting-info v-bind:meeting_info="meeting_info"> </meeting-info>
        <hr />
      </div>
    </section>

    <!--
        出席確認
    -->
    <section class="section">
      <div class="container" align="center">
        <h1 class="title">2. 出席確認</h1>
        <check-attendance-columns v-bind:member_info_list="member_info_list">
        </check-attendance-columns>
        <hr />
      </div>
    </section>

    <!--
        仕事 first_choice
    -->
    <section class="section">
      <div class="container" align="center">
        <h1 class="title">3. 指名決め</h1>
        <first-choice-work-list
          v-bind:all_works="all_works"
          v-bind:member_info_list="member_info_list"
          v-bind:selectable_members="selectable_members"
          v-bind:meeting_info="meeting_info"
        >
        </first-choice-work-list>
        <hr />
      </div>
    </section>
    <!--
        仕事 second_choice
    -->
    <section class="section">
      <div class="container" align="center">
        <h1 class="title">4. ランダム決め</h1>
        <second-choice-work-list
          v-bind:all_works="all_works"
          v-bind:member_info_list="member_info_list"
          v-bind:meeting_info="meeting_info"
        >
        </second-choice-work-list>
        <hr />
      </div>
    </section>

    <!--
        出席と当番の情報
    -->
    <section class="section">
      <div class="container" align="center">
        <h1 class="title">5. 出席と当番の情報</h1>
        <assigned-work-text
          v-bind:member_info_list="member_info_list"
          v-bind:all_works="all_works"
          v-bind:meeting_info="meeting_info"
          v-on:update-db="writeMeetingInfo"
        >
        </assigned-work-text>
        <hr />
      </div>
    </section>

    <!--
        今日の会議情報を保存
    -->
    <section class="section">
      <div class="container" align="center">
        <h1 class="title">6. 今日の会議情報を保存</h1>
        <br />
        <h2 class="subtitle">今日の会議の情報をfirestoreに保存します</h2>
        <br />
        <div class="columns is-mobile">
          <div
            class="column is-half-desktop is-offset-one-quarter-desktop is-full-mobile"
          >
            <button
              class="button is-primary is-large is-fullwidth"
              v-bind:disabled="meeting_info.is_submited"
              v-on:click="writeMeetingInfo"
            >
              Submit
            </button>
          </div>
        </div>
        <br />
        <h2 class="subtitle">今日もお疲れ様でした！</h2>
        <hr />
      </div>
    </section>
  </div>
</template>

<script>
// todo: 本番前は以下を消す
import member_info_list_json from "@/assets/member_info_list.json";
import all_members_json from "@/assets/all_members.json";
import all_works_json from "@/assets/all_works.json";

import MeetingInfo from "@/components/assigning_work/MeetingInfo";
import CheckAttendanceColumns from "@/components/assigning_work/CheckAttendanceColumns";
import FirstChoiceWorkList from "@/components/assigning_work/FirstChoiceWorkList";
import SecondChoiceWorkList from "@/components/assigning_work/SecondChoiceWorkList";
import AssignedWorkText from "@/components/assigning_work/AssignedWorkText";

import {
  arrayShuffle,
  compareValues,
  compareDeepValues
} from "@/assets/js/function_of_member_info_list.js";

import firebaseApp from "@/firebaseInit";
const db = firebaseApp.firestore();
export default {
  components: {
    MeetingInfo,
    CheckAttendanceColumns,
    FirstChoiceWorkList,
    SecondChoiceWorkList,
    AssignedWorkText
  },
  data: function() {
    return {
      meeting_info: {
        meeting_num: "",
        place: "",
        start_time: "",
        end_time: "",
        date: "",
        is_submited: false,
        can_run: true
      },
      all_members: [], //all_members_json,
      all_works: [],
      // all_works_json,
      //member_info_list: [] // 過去の当番回数情報
      member_info_list: [] // member_info_list_json, // 過去の当番回数情報
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
      today_date
        .toLocaleDateString()
        .split("/")
        .join(":") +
      "_" +
      today_date.toLocaleTimeString();
    console.log(this.meeting_info.date);
    this.meeting_info.start_time = today_date
      .toLocaleTimeString()
      .split(":")
      .splice(0, 2)
      .join(":");
    // ユーザ情報
    let all_members = [];
    // todo: 以下を消してdbのところに移す
    let all_stu_nums = [];

    // メンバー
    // 仕事
    let work_ids = [];
    let member_info_list = [];
    let member_info_dic = {};
    let flag = false;
    db.collection("members")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          //all_members[doc.id] = doc.data();
          all_members.push(doc.data());
          // console.log(doc.id, "=>", doc.data());
        });
      })
      .then(msg => {
        this.all_members = all_members;
        this.all_members.forEach(member => {
          all_stu_nums.push(member.stu_num);
        });

        let all_works = [];
        // 仕事
        db.collection("works")
          .get()
          .then(snapshot => {
            snapshot.forEach(doc => {
              //all_works[doc.id] = doc.data();
              work_ids.push(doc.id);
              all_works.push(doc.data());
              // console.log(doc.id, "=>", doc.data());
            });
          })
          .then(msg => {
            this.all_works = all_works;
          })
          .catch(err => {
            console.log("Error getting documents", err);
          })
          .then(msg => {
            // メンバーの過去の情報と今回の情報を初期化
            for (const member of this.all_members) {
              member_info_dic[member.stu_num] = {
                name: member.name,
                grade: member.grade,
                priority: member.priority,
                stu_num: member.stu_num,
                attendance: "o",
                assigned_work: "",
                assigned_work_id: "",
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
          })
          .then(msg => {
            db.collection("past_meeting")
              .get()
              .then(snapshot => {
                snapshot.forEach(doc => {
                  for (const stu_num of Object.keys(
                    doc.data()["attendance_by_member"]
                  )) {
                    const member_info = doc.data()["attendance_by_member"][
                      stu_num
                    ];
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
                      member_info_dic[stu_num]["work_count_by_category"][
                        work_id
                      ]++;
                    } else {
                      member_info_dic[stu_num]["work_count"]++;
                      member_info_dic[stu_num]["work_count_by_category"][
                        "work98"
                      ]++; // その他
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
              })
              .then(msg => {
                for (const key of Object.keys(member_info_dic)) {
                  member_info_list.push(member_info_dic[key]);
                }
                this.member_info_list = member_info_list;
                //this.member_info_list.sort(
                //  compareDeepValues("work_count_by_category", "work03")
                //);

                this.all_members = arrayShuffle(this.all_members);
                this.all_members = arrayShuffle(this.all_members);
                this.all_members = arrayShuffle(this.all_members);
                this.all_members
                  .sort(compareValues("stu_num"))
                  .sort(compareValues("grade")); // 学籍番号でソートしたのち、学年でソート
                this.all_members.sort(compareValues("stu_num"));
                this.member_info_list.sort(compareValues("stu_num"));
              })
              .catch(err => {
                console.log("Error getting documents", err);
              });
            console.log("created_works");
          });
      });
  },
  methods: {
    writeMeetingInfo: function() {
      if (this.meeting_info.is_submited) {
        alert("一度提出しました。");
        return;
      }
      let this_meeting = Object.assign({}, this.meeting_info);
      delete this_meeting.is_submited;
      delete this_meeting.can_run;
      this_meeting["attendance_by_member"] = {};
      for (const member_info of this.member_info_list) {
        this_meeting["attendance_by_member"][member_info.stu_num] = {
          attendance: member_info.attendance,
          stu_num: member_info.stu_num,
          username: member_info.name,
          work: member_info.assigned_work,
          work_id: member_info.assigned_work_id
        };
      }
      db.collection("past_meeting")
        .doc(this.meeting_info.date)
        .set(this_meeting)
        .then(res => {})
        .catch(err => {});
      this.meeting_info.is_submited = true;

      alert("提出できました");
    }
  }
};
</script>

<style lang="css" scoped></style>
