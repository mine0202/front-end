<!--   < 누르면 기본폼 만들기 -->

<template>
    <!-- EmpList.vue -->
    <div class="list row">
    <!--  검색어 시작 -->
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Search by ename" v-model="ename" @keyup.enter="searchEname"/>
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button" @click="searchEname">
            Search
          </button>
        </div>
      </div>
    </div>
    <!-- 검색어 끝 -->

    <!-- 전체 목록 조회 시작 -->
    <div class="col-md-6">
      <h4 class="emp">Emp List</h4>
      <ul class="list-group">
          <li class="list-group-item list-group-item-action" 
          :class="{ active: index == currentIndex }" 
          v-for="(data, index) in emp"
          :key="index" @click="setActiveEmp(data, index)">
          {{ data.ename }}
        </li>
      </ul>

      <button class="m-3 btn btn-sm btn-danger" @click="removeAllEmp">
        Remove All
      </button>
    </div>
    <!-- 전체 목록 조회 끝 -->

    <!-- 클릭하면 오른쪽 간략한 상세 목록 시작-->
    <div class="col-md-6">
      <div v-if="currentEmp">
        <h4>Emp</h4>
        <div>
          <label><strong>Eno:</strong></label> {{ currentEmp.eno }}
        </div>
        <div>
          <label><strong>Ename:</strong></label> {{ currentEmp.ename }}
        </div>
        <div>
          <label><strong>Job:</strong></label> {{ currentEmp.job }}
        </div>
        <div>
          <label><strong>Manager:</strong></label> {{ currentEmp.manager }}
        </div>
        <div>
          <label><strong>Salary:</strong></label> {{ currentEmp.salary }}
        </div>
        <div>
          <label><strong>Commission:</strong></label> {{ currentEmp.commission }}
        </div>
        <div>
          <label><strong>Dno:</strong></label> {{ currentEmp.dno }}
        </div>

        <router-link :to="'/emp/' + currentEmp.eno"><span class="badge bg-success">Edit</span></router-link>
      </div>
      <div v-else>
        <br />
        <p>Please click on a Emp...</p>
      </div>
    </div>
    <!-- 클릭 오른쪽 간략한 상세 목록 끝 -->

  </div>
</template>

<script>
// axios 공통함수 불러오기
import EmpDataService from '@/services/EmpDataService';


export default {
  // 변수 정의하는 곳 : data(), 초기화
  data(){
    return{
      emp:[],  // 스프링부트에서 오는 데이터 넣는 빈 배열
      currentEmp: null,  // 클릭했을때 들어갈 데이터 
      currentIndex : -1,  
      ename:""  //   속성 초기화
    }
  },
  // 함수 정의하는 곳 : metods:
  methods:{

    
    // axios 부서명으로 like 검색 함수
    searchEname(){
      // 디버그
      // alert(this.ename)
      // dname 이 data 에 바인딩되어있으므로 this.dname 으로 불러옴
      EmpDataService.findByEname(this.ename)
      
      .then(response=>{
        this.emp = response.data; // like 검색결과를 변수에 저장
        console.log(response.data)
      })
      .catch(e=>{
        console.log(e)
      })
    },

    // axios , 모든 부서정보 조회 요청 함수
    retriebeEmp(){
      EmpDataService.getAll()
    //  axios 성공하면  .then  결과전송됨
      .then(response=>{
        this.emp= response.data; // springboot 의 전송된 부서정보
        // 디버깅 콘솔에 정보 출력
        console.log(response.data);
      })
      // 실패하면 .catch() 에 에러가 전송됨
      .catch( e => {
        console.log(e);
      })
    },
    // 목록을 클릭했을때 현재 부서객체, 인덱스번호를 저장하는 함수
    setActiveEmp(data, index){
      this.currentEmp = data;
      this.currentIndex = index;
    },
    // axios 모든 부서 정보 삭제 요청함수 
    removeAllEmp(){
      EmpDataService.deleteAll()
    //  axios 성공하면  .then  결과전송됨
      .then(response=>{
        // 디버깅 콘솔에 정보 출력
        console.log(response.data);
        // 전체 목록 재조회
        this.retriebeEmp();
        // currentDept , currentIndex 초기화
        this.currentEmp = null; 
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
    this.retriebeEmp(); // 화면이 뜨자마자 전체목록이 실행되면서 화면에 나옴
  }
}
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
.emp {
  color: skyblue;
  font-weight: bold;
}
</style>