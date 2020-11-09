<template>
    <div class="app-container">
        <el-form inline @submit.native.prevent>
            <el-form-item label="分类">
                <el-select v-model="listQuery.tag_id" placeholder="请选择">
                    <el-option label="全部" value="" />
                    <el-option
                        v-for="item in tagList"
                        :key="item._id"
                        :label="item.name"
                        :value="item._id" />
                </el-select>
            </el-form-item>
            <el-form-item label="名称">
                <el-input v-model="listQuery.name" placeholder="请输入名称" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleSearch">搜索</el-button>
                <!-- <el-button type="warning" @click="handleAdd()">新增</el-button> -->
                <el-button @click="handleAdd()">同步</el-button>
            </el-form-item>
        </el-form>
        <el-table v-loading="listLoading" :data="list" border fit highlight-current-row>
            <el-table-column type="selection" width="55" />
            <el-table-column align="center" label="序号" type="index" width="80" />
            <el-table-column align="center" label="产品id" prop="_id" />
            <el-table-column align="center" label="产品名称" prop="name" />
            <el-table-column align="center" label="产品图片">
                <template slot-scope="scope">
                    <el-image :src="scope.row.pic | filterUrl" width="100" height="100" :preview-src-list="[$baseUrl + '/' + scope.row.pic ]" />
                </template>
            </el-table-column>
            <el-table-column align="center" label="产品价格">
                <template slot-scope="scope">
                    <span>{{ scope.row.price.join(',') }}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="产品分类" prop="tag_name" />
            <el-table-column align="center" label="创建时间" prop="created_time" />
            <el-table-column align="center" label="更新时间" prop="updated_time" />
            <el-table-column align="center" label="操作">
                <template slot-scope="scope">
                    <!-- <el-button type="text" size="mini" @click="handleEdit(scope.row)">编辑</el-button> -->
                    <el-button type="text" size="mini" @click="handleDelete(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <pagination v-show="total>0" :total="total" :page.sync="listQuery.page_no" :limit.sync="listQuery.page_size" @pagination="fetchData" />

        <!-- <product-form :form="form" :visible="visible" @close="visible = false" @refresh="handleRefresh" /> -->
        <fetch-form :visible="visible" :tag-list="tagList" :company_id="company_id" @close="visible = false" @refresh="handleRefresh" />
    </div>
</template>

<script>
import { listProduct, deleteProduct, listTag } from '@/api/company'
import FetchForm from './components/fetch'
import { mapGetters } from 'vuex'
import Pagination from '@/components/Pagination'
export default {
    name: 'Product',
    components: {
        Pagination, FetchForm
    },
    data() {
        return {
            listLoading: false,
            list: [],
            total: 0,
            listQuery: {
                page_no: 1,
                page_size: 10,
                name: '',
                tag_id: ''
            },
            visible: false,
            tagList: []
        }
    },
    computed: {
        ...mapGetters(['company_id'])
    },
    created() {
        this.fetchData()
        listTag({
            page_no: 1,
            page_size: 100,
            company_id: this.company_id
        }).then(res => {
            this.tagList = res.data.list
        })
    },
    methods: {
        fetchData() {
            listProduct({
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
            this.visible = true
        },
        handleDelete(item) {
            this.$confirm('是否删除该产品！', { type: 'warning' }).then(() => {
                deleteProduct({ id: item._id }).then((response) => {
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
