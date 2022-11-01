<template>
  <!-- <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav> -->
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">SimpleDMS</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav">
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button"
              data-bs-toggle="dropdown" aria-expanded="false">
              Department Info
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <li><a class="dropdown-item" href="#">Dept</a></li>
              <li><a class="dropdown-item" href="#">Add</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <!-- 메뉴를 클릭하면 화면에 보이는 부분 -->
  <!-- container 화면에 중앙정렬 외각선 없는 박스형태로 보임 -->
  <!-- mt -3  :  마진탑 3 , 1부터 5까지 사이즈가 정의됨 -->
  <div class="container mt-3">
    <router-view />
  </div>
</template>

<style lang="scss">

</style>
