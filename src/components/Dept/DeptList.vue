<!--   < 누르면 기본폼 만들기 -->

<template>
  <!-- DeptList.vue -->
  <div class="list row">
    <!--  검색어 시작 -->
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Search by dname" v-model="dname" />
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button" @click="searchDname">
            Search
          </button>
        </div>
      </div>
    </div>
    <!-- 검색어 끝 -->

    <!-- 전체 목록 조회 시작 -->
    <div class="col-md-6">
      <h4 class="dept">Dept List</h4>
      <ul class="list-group">
        <li class="list-group-item list-group-item-action" :class="{ active: index == currentIndex }" v-for="(data, index) in dept"
          :key="index" @click="setActiveDept(data, index)">
          {{ data.dname }}
        </li>
      </ul>

      <button class="m-3 btn btn-sm btn-danger" @click="removeAllDept">
        Remove All
      </button>
    </div>
    <!-- 전체 목록 조회 끝 -->

    <!-- 클릭하면 오른쪽 간략한 상세 목록 시작-->
    <div class="col-md-6">
      <div v-if="currentDept">
        <h4>Dept</h4>
        <div>
          <label><strong>Dname:</strong></label> {{ currentDept.dname }}
        </div>
        <div>
          <label><strong>Loc:</strong></label> {{ currentDept.loc }}
        </div>

        <router-link :to="'/dept/' + currentDept.dno"><span class="badge bg-success">Edit</span></router-link>
      </div>
      <div v-else>
        <br />
        <p>Please click on a Dept...</p>
      </div>
    </div>
    <!-- 클릭 오른쪽 간략한 상세 목록 끝 -->

  </div>
</template>

<script>
// axios 공통함수 불러오기
import DeptDataService from '@/services/DeptDataService';


export default {
  // 변수 정의하는 곳 : data(), 초기화
  data(){
    return{
      dept:[],  // 스프링부트에서 오는 데이터 넣는 빈 배열
      currentDept: null,  // 클릭했을때 들어갈 데이터 
      currentIndex : -1,  
      dname:""  //   속성 초기화
    }
  },
  // 함수 정의하는 곳 : metods:
  methods:{
    // axios , 모든 부서정보 조회 요청 함수
    retriebeDept(){
      DeptDataService.getAll()
    //  axios 성공하면  .then  결과전송됨
      .then(response=>{
        this.dept= response.data; // springboot 의 전송된 부서정보
        // 디버깅 콘솔에 정보 출력
        console.log(response.data);
      })
      // 실패하면 .catch() 에 에러가 전송됨
      .catch( e => {
        console.log(e);
        
      })
    },
    // 목록을 클릭했을때 현재 부서객체, 인덱스번호를 저장하는 함수
    setActiveDept(data, index){
      this.currentDept = data;
      this.currentIndex = index;
    },
    // axios 모든 부서 정보 삭제 요청함수 
    removeAllDept(){
      DeptDataService.deleteAll()
    //  axios 성공하면  .then  결과전송됨
      .then(response=>{
        // 디버깅 콘솔에 정보 출력
        console.log(response.data);
        // 전체 목록 재조회
        this.retriebeDept();
        // currentDept , currentIndex 초기화
        this.currentDept = null;
        this.currentIndex = -1;
        location.reload(true);
      })
      // 실패하면 .catch() 에 에러가 전송됨
      .catch( e => {
        console.log(e);
      })
    }
  },
  // 화면이 뜨자마자 실행되는 이벤트, 라이프사이클 함수 - mounted(), created()
  mounted(){
    this.retriebeDept(); // 화면이 뜨자마자 전체목록이 실행되면서 화면에 나옴
  }
}
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
.dept {
  color: pink;
  font-weight: bold;
}
</style>