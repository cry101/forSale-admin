<template>
    <div class="app-container">
        <el-form inline @submit.native.prevent>
            <el-form-item>
                <el-input v-model="listQuery.name" placeholder="请输入名称" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleSearch">搜索</el-button>
                <el-button @click="handleAdd()">新增</el-button>
            </el-form-item>
        </el-form>
        <el-table v-loading="listLoading" :data="list" border fit highlight-current-row>
            <el-table-column align="center" label="序号" type="index" width="60" />
            <el-table-column align="center" label="分类id" prop="_id" width="220" />
            <el-table-column align="center" label="分类名称" prop="name" />
            <el-table-column align="center" label="分类编码" prop="code" />
            <el-table-column align="center" label="排序" prop="sort" />
            <el-table-column align="center" label="创建时间" prop="created_time" />
            <el-table-column align="center" label="更新时间" prop="updated_time" />
            <el-table-column align="center" label="操作">
                <template slot-scope="scope">
                    <el-button type="text" size="mini" @click="handleEdit(scope.row)">编辑</el-button>
                    <el-button type="text" size="mini" @click="handleDelete(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <pagination v-show="total>0" :total="total" :page.sync="listQuery.page_no" :limit.sync="listQuery.page_size" @pagination="fetchData" />

        <tag-form :form="form" :visible="visible" :company_id="company_id" @close="visible = false" @refresh="handleRefresh" />
    </div>
</template>

<script>
import { listTag, deleteTag } from '@/api/company'
import { mapGetters } from 'vuex'
import TagForm from './components/form'
import Pagination from '@/components/Pagination'
export default {
    name: 'Tag',
    components: {
        TagForm, Pagination
    },
    data() {
        return {
            listLoading: false,
            list: [],
            total: 0,
            listQuery: {
                page_no: 1,
                page_size: 10,
                name: ''
            },
            form: null,
            visible: false
        }
    },
    computed: {
        ...mapGetters(['company_id'])
    },
    created() {
        this.fetchData()
    },
    methods: {
        fetchData() {
            listTag({
                ...this.listQuery,
                company_id: this.company_id
            }).then(res => {
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
                sort: item.sort,
                code: item.code,
                company_id: item.company_id
            }
            this.visible = true
        },
        handleDelete(item) {
            this.$confirm('是否删除该分类！', { type: 'warning' }).then(() => {
                deleteTag({ id: item._id }).then((response) => {
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

<style>

</style>
