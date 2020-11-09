<template>
    <div class="navbar">
        <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

        <breadcrumb class="breadcrumb-container" />

        <div class="right-menu">
            <el-select v-model="companyId" placeholder="请选择" :disabled="!userInfo.isAdmin" @change="e => handleChange(e)">
                <el-option
                    v-for="item in company"
                    :key="item._id"
                    :label="item.name"
                    :value="item._id" />
            </el-select>
            <el-dropdown class="avatar-container" trigger="click">
                <div class="avatar-wrapper">
                    <el-image :src="userInfo.avatar" class="user-avatar" />
                    <span>{{ userInfo.nickName }}</span>
                    <i class="el-icon-caret-bottom" />
                </div>
                <el-dropdown-menu slot="dropdown" class="user-dropdown">
                    <el-dropdown-item @click.native="logout">
                        <span style="display:block;">退出</span>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import { listCompany } from '@/api/company'

export default {
    components: {
        Breadcrumb,
        Hamburger
    },
    data() {
        return {
            company: [],
            companyId: ''
        }
    },
    computed: {
        ...mapGetters([
            'sidebar',
            'userInfo',
            'company_id'
        ])
    },
    created() {
        this.companyId = this.company_id
        this.init()
    },
    methods: {
      	init() {
            listCompany({
                page_size: 1000
            }).then(res => {
                this.company = res.data.list
            })
        },
        async handleChange(val) {
            // console.log(val)
            await this.$store.dispatch('user/setCompany', val)
            window.location.reload()
        },
        toggleSideBar() {
            this.$store.dispatch('app/toggleSideBar')
        },
        async logout() {
            await this.$store.dispatch('user/logout')
            this.$router.push(`/login?redirect=${this.$route.fullPath}`)
        }
    }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
	line-height: 50px;
	display: flex;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin: 0 15px;

      .avatar-wrapper {
		position: relative;
		display: flex;
		align-items: center;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
