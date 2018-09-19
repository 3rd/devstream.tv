<template>
  <div id="app">
    <app-header></app-header>
    <router-view/>
    <app-footer></app-footer>
  </div>
</template>

<script>
import AppHeader from '@/components/partials/Header'
import AppFooter from '@/components/partials/Footer'

export default {
  name: 'App',
  components: { AppHeader, AppFooter },
  data () {
    return {
    }
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Roboto+Mono:300,400,500|Roboto:300,400,500');
@import url('https://cdn.bootcss.com/material-design-icons/3.0.1/iconfont/material-icons.css');

body {
  font-family: 'Roboto';
  background: white;
}

a {
  color: #222;
  text-decoration: underline;
}

b {
  font-weight: 500;
}

.page {
  min-height: 100vh;
}

.page .content {
  max-width: 1000px;
  padding: 30px 80px;
  margin: auto;
  min-height: 100%;

  h1.title {
    font-weight: 300;
    font-size: 32px;
    color: #1e3ad0;
    margin: 80px 0px;
  }
}

.mu-form-item-label {
  color: #333;
}

.links-wizard {
  &.mu-form-item .mu-input {
    width: 100%;
    margin-right: 10px;

    &:last-child {
      margin: 0;
    }

    &.name {
      width: 40%;
    }
  }
  .mu-form-item-content > div {
    display: flex;
    width: 100%;
  }
}
.modal .mu-dialog-actions {
  padding-bottom: 20px;
  button {
    margin-right: 10px;
  }
}

/* Responsive */
.page > div {
  padding: 0 30px
}
@media all and (max-width: 600px) {
  .page .content {
    padding: 20px 30px;

    h1.title {
      text-align: center;
      margin: 40px 0;
    }
  }
}
</style>
