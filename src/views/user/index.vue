<template>
    <div class="app-container">
        <el-form inline @submit.native.prevent>
            <el-form-item>
                <el-input v-model="listQuery.nickName" placeholder="请输入名称" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleSearch">搜索</el-button>
            </el-form-item>
        </el-form>
        <el-table v-loading="listLoading" :data="list" border fit highlight-current-row>
            <el-table-column type="selection" width="55" />
            <el-table-column align="center" label="序号" type="index" width="80" />
            <el-table-column align="center" label="昵称" prop="nickName" />
            <el-table-column align="center" label="用户头像" width="130">
                <template slot-scope="scope">
                    <el-image :src="scope.row.avatarUrl" class="image" />
                </template>
            </el-table-column>
            <el-table-column align="center" label="城市" prop="city" />
            <el-table-column align="center" label="token" prop="token" />
            <el-table-column align="center" label="创建时间" prop="created_time" />
            <el-table-column align="center" label="更新时间" prop="updated_time" />
            <el-table-column align="center" label="操作">
                <template slot-scope="scope">
                    <el-button type="text" size="mini" @click="handleDelete(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <pagination v-show="total>0" :total="total" :page.sync="listQuery.page_no" :limit.sync="listQuery.page_size" @pagination="fetchData" />

    </div>
</template>

<script>
import { listUser, deleteUser } from '@/api/user'
import Pagination from '@/components/Pagination'
export default {
    name: 'Company',
    components: {
        Pagination
    },
    data() {
        return {
            listLoading: false,
            list: [],
            total: 0,
            listQuery: {
                page_no: 1,
                page_size: 10,
                nickName: ''
            },
            form: null,
            visible: false
        }
    },
    created() {
        this.fetchData()
    },
    methods: {
        fetchData() {
            listUser(this.listQuery).then(res => {
                this.list = res.data.list
                this.total = res.data.total
            })
        },
        handleSearch() {
            this.listQuery.page_no = 1
            this.fetchData()
        },
        handleAdd() {
            this.form = null
            this.visible = true
        },
        handleEdit(item) {
            this.form = {
                name: item.name,
                id: item._id,
                remark: item.remark
            }
            this.visible = true
        },
        handleDelete(item) {
            this.$confirm('是否删除该用户？', { type: 'warning' }).then(() => {
                deleteUser({ id: item._id }).then((response) => {
                    this.$message.success('删除成功')
                    this.fetchData()
                })
            })
        },
        handleRefresh() {
            this.visible = false
            this.fetchData()
        }
    }
}
</script>

<style scoped>
.image{
    width: 100px;
    height: 100px;
}
</style>
