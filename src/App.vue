<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" >SimpleDMS</a>

      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <!-- 대메뉴 정의  -->
        <ul class="navbar-nav">
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button"
              data-bs-toggle="dropdown" aria-expanded="false">
              Department Info
            </a>

            <!-- 소메뉴 정의 -->
            <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <li><router-link to="/dept" class="dropdown-item">Dept</router-link></li>
              <li><router-link to="/add/dept" class="dropdown-item">Add</router-link></li>
            </ul>
          </li>
        </ul>

        <!-- 대 메뉴2 정의 -->
        <ul class="navbar-nav">
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button"
              data-bs-toggle="dropdown" aria-expanded="false">
              Employee Info
            </a>

            <!-- 소메뉴2 정의 -->
            <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <li><router-link to="/emp" class="dropdown-item">Emp</router-link></li>
              <li><router-link to="/add/emp" class="dropdown-item">Add</router-link></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <!-- emp 메뉴 , empdataservice.js 파일만들기 -->
  <!-- 메뉴를 클릭하면 화면에 보이는 부분 -->
  <!-- container 화면에 중앙정렬 외각선 없는 박스형태로 보임 -->
  <!-- mt -3  :  마진탑 3 , 1부터 5까지 사이즈가 정의됨 -->
  <div class="container mt-3">
    <router-view />
  </div>
</template>

<style lang="scss">

</style>
