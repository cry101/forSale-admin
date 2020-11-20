<template>
    <el-dialog
        center
        :visible.sync="dialogVisible"
        width="660px"
        title="同步官网数据"
        top="60px"
        @close="close"
    >
        <el-form ref="form" :model="formData" :rules="rules" label-width="120px">
            <el-form-item label="公司" prop="company_id">
                <el-select v-model="formData.company_id" placeholder="请选择">
                    <el-option
                        v-for="item in company"
                        :key="item._id"
                        :label="item.name"
                        :value="item._id" />
                </el-select>
            </el-form-item>
            <el-form-item label="分类" prop="tag_id">
                <el-select v-model="formData.tag_id" placeholder="请选择" @change="handleChange">
                    <el-option
                        v-for="item in tagList"
                        :key="item._id"
                        :label="item.name"
                        :value="item._id" />
                </el-select>
            </el-form-item>
            <el-form-item label="页码" prop="page_no">
                <el-input v-model="formData.page_no" type="number" :min="1" />
            </el-form-item>
            <el-form-item label="分页尺寸" prop="page_size">
                <el-input v-model="formData.page_size" type="number" :max="100" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" :loading="loading2" @click="handleCheck">检查</el-button>
                <el-button type="primary" :loading="loading" @click="handleSubmit">保存</el-button>
                <el-button @click="close">取消</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script>
import { listCompany, fetchProduct, checkProduct } from '@/api/company'

export default {
    props: {
        visible: {
            type: Boolean,
            default: false
        },
        tagList: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            loading: false,
            loading2: false,
            formData: {
                company_id: '',
                tag_id: '',
                code: '',
                page_no: 1,
                page_size: 100
            },
            rules: {
                company_id: [{ required: true, message: '请选择公司', trigger: 'blur' }],
                tag_id: [{ required: true, message: '请选择分类', trigger: 'blur' }],
                page_no: [{ required: true, message: '请输入分页参数', trigger: 'blur' }],
                page_size: [{ required: true, message: '请输入分页参数', trigger: 'blur' }]
            },
            company: []
        }
    },
    computed: {
        dialogVisible: {
            get() { return this.visible },
            set() {}
        }
    },
    created() {
        this.init()
    },
    methods: {
        init() {
            listCompany({
                page_size: 100
            }).then(res => {
                this.company = res.data.list
            })
        },
        handleChange(val, item) {
            let code = this.tagList.find(i => i._id === val).code
            console.log(code)
            this.formData.code = code
        },
        handleSubmit() {
            this.$refs.form.validate(vaild => {
                if (vaild) {
                    this.loading = true
                    fetchProduct(this.formData).then(res => {
                        this.$message.success('同步成功')
                        this.refresh()
                        this.loading = false
                    }).catch(() => {
                        this.loading = false
                    })
                }
            })
        },
        handleCheck() {
            this.$refs.form.validate(vaild => {
                if (vaild) {
                    this.loading2 = true
                    checkProduct(this.formData).then(res => {
                        this.$message.success('检查成功')
                        this.loading2 = false
                    }).catch(() => {
                        this.loading2 = false
                    })
                }
            })
        },
        close() {
            this.$emit('close')
        },
        refresh() {
            this.$emit('refresh')
        }
    }
}
</script>

<style>

</style>
