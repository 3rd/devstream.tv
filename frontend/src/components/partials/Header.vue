<template>
  <div class="app-header">
    <mu-flex class="flex-wrapper" align-items="center">
      <mu-flex class="logo-wrapper" justify-content="center" fill>
        <div class="logo">
          <a href="/">
            {devstream.tv}
          </a>
        </div>
      </mu-flex>
      <mu-flex class="switch-actions" justify-content="center" fill>
        <!-- <ul class="switch">
          <router-link tag="li" class="option" active-class="active" to="/">
            Live developers
          </router-link>
          <router-link v-if="false" tag="li" class="option" active-class="active" to="/videos">
            Videos
          </router-link>
        </ul> -->
      </mu-flex>
      <mu-flex class="menu-wrapper" justify-content="center" fill>
        <ul class="menu">
          <router-link tag="li" class="option" active-class="active" to="/submit-content">
            Submit content
          </router-link>
          <router-link tag="li" class="option" active-class="active" to="/faq">
            FAQ
          </router-link>
        </ul>
      </mu-flex>
    </mu-flex>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.app-header {
  background: #4b67fa;
  color: white;
  padding: 30px 20px;
}
.logo a {
  font-size: 18px;
  font-family: 'Roboto Mono';
  color: white;
  text-decoration: none;
}
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
li {
  display: inline-block;
  cursor: pointer;
}

.switch {
  background: #1e3ad0;
  padding: 4px;
  border-radius: 20px;

  li {
    padding: 8px 30px;
    border-radius: 20px;

    &.router-link-exact-active {
      background: white;
      color: #4b67fa;
    }
  }
}

.menu {
  li {
    padding: 4px 10px;
    border-radius: 20px;
    border: 2px solid transparent;

    &:hover {
      background: #1e3ad0;
    }

    &:not(:first-child) {
      margin-left: 20px;
    }

    &.router-link-exact-active {
      border: 2px solid rgba(255, 255, 255, 0.9);
    }
  }
}

@media all and (max-width: 600px) {
  .app-header {
    padding: 40px 10px;

    > .flex-wrapper {
      display: block !important;
      > div {
        display: block !important;
        margin: auto;
        text-align: center;
      }
      .logo-wrapper {
        margin-bottom: 20px;

        a {
          font-size: 24px;
        }
      }
      .switch-actions {
        display: none !important;
      }
    }
  }
}
</style>
