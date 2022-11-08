<!--   < 누르면 기본폼 만들기 -->

<template>
  <!-- DeptList.vue -->
  <div class="list row">
    <!-- 검색어 시작  -->
    <div class="col-md-8">
      <div class="input-group mb-3">
        <!-- 검색어 입력  -->
        <input type="text" class="form-control" placeholder="Search by Dname" v-model="searchDname" @keyup.enter="searchDname" />
        <!-- 검색어 버튼  -->
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button" @click=" page = 1; retrieveDept(); ">
            Search
          </button>
        </div>
      </div>
    </div>
    <!-- 검색어 끝  -->

    
    <!-- 페이징 + 전체 목록 시작  -->
    <!-- 페이징 양식 시작  -->
    <div class="col-md-12">
      <!-- 셀렉트 박스 : 기본 페이지 변경  -->
      <!-- change :  handlePageSizeChange($event), 1페이지당 개수 변경 시 실행되는 이벤트 -->
      <!--           $event : html 태그의 기본 이벤트, 이 객체로 현재 선택 또는 클릭한 html태그(양식)를 알 수 있음.  -->
      <!-- event.target (현재 사용자가 선택한 양식(여기서는 셀렉트 박스내 목록을 의미 )  -->
      <div class="mb-3">
        Items per Page:
        <select v-model="pageSize" @change="handlePageSizeChange($event)">
          <option v-for="size in pageSizes" :key="size" :value="size">
            {{ size }}
          </option>
        </select>
      </div>

      <!-- b-pagination : 부트스트랩 - 페이지 번호 컨트롤  -->
      <!-- total-rows : 전체 데이터 개수  -->
      <!-- per-page : 1페이지 당 개수  -->
      <!-- change : handlePageChange(), 페이지 번호 변경 시 실행되는 이벤트  -->
      <b-pagination
        v-model="page"
        :total-rows="count"
        :per-page="pageSize"
        prev-text="Prev"
        next-text="Next"
        @change="handlePageChange"
      ></b-pagination>
    </div>
    <!-- 페이징 양식 끝 -->


    
    <!-- 전체 목록 시작 -->
    <div class="col-md-6">
      <h4>Dept List</h4>
      <ul class="list-group" id="dept-list">
        <li
          class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(data, index) in dept"
          :key="index"
          @click="setActiveDept(data, index)"
        >
          {{ data.dname }}
        </li>
      </ul>
      <!-- 전체 목록 끝 -->

      <!-- 삭제 버튼 시작 -->
      <button class="m-3 btn btn-sm btn-danger" @click="removeAllDept">
        Remove All
      </button>
      <!-- 삭제 버튼 끝 -->
    </div>
    <!-- 페이징 + 전체 목록 끝 -->


    <!-- 클릭하면 오른쪽 간략한 상세 목록 시작-->
    <div class="col-md-6">
      <div v-if="currentDept">
        <h4>Dept</h4>
        <div>
          <label><strong>Dno:</strong></label> {{ currentDept.dno }}
        </div>
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
  data() {
    return {
      dept: [],  // 스프링부트에서 오는 데이터 넣는 빈 배열
      currentDept: null,  // 클릭했을때 들어갈 데이터 
      currentIndex: -1,
      dname: ""  //   속성 초기화
    }
  },
  // 함수 정의하는 곳 : metods:
  methods: {

    // axios 부서명으로 like 검색 함수
    searchDname() {
      // dname 이 data 에 바인딩되어있으므로 this.dname 으로 불러옴
      DeptDataService.findByDname(this.dname)
        .then(response => {
          this.dept = response.data; // like 검색결과를 변수에 저장
          console.log(response.data)
        })
        .catch(e => {
          console.log(e)
        })
    },


    // axios , 모든 부서정보 조회 요청 함수
    retriebeDept() {
      DeptDataService.getAll()
        //  axios 성공하면  .then  결과전송됨
        .then(response => {
          this.dept = response.data; // springboot 의 전송된 부서정보
          // 디버깅 콘솔에 정보 출력
          console.log(response.data);
        })
        // 실패하면 .catch() 에 에러가 전송됨
        .catch(e => {
          console.log(e);

        })
    },
    // 목록을 클릭했을때 현재 부서객체, 인덱스번호를 저장하는 함수
    setActiveDept(data, index) {
      this.currentDept = data;
      this.currentIndex = index;
    },
    // axios 모든 부서 정보 삭제 요청함수 
    removeAllDept() {
      DeptDataService.deleteAll()
        //  axios 성공하면  .then  결과전송됨
        .then(response => {
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
        .catch(e => {
          console.log(e);
        })
    }
  },
  // 화면이 뜨자마자 실행되는 이벤트, 라이프사이클 함수 - mounted(), created()
  mounted() {
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