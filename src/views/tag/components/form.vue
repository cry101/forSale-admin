<template>
    <el-dialog
        center
        :visible.sync="dialogVisible"
        width="660px"
        title="新增"
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
            <el-form-item label="分类名称" prop="name">
                <el-input v-model="formData.name" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" :loading="loading" @click="handleSubmit">保存</el-button>
                <el-button @click="close">取消</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script>
import { addTag, modifyTag, listCompany } from '@/api/company'

export default {
    props: {
        visible: {
            type: Boolean,
            default: false
        },
        form: { // 编辑
            type: Object,
            default: null
        }
    },
    data() {
        return {
            loading: false,
            formData: {
                name: '',
                company_id: ''
            },
            rules: {
                company_id: [{ required: true, message: '请选择公司', trigger: 'blur' }],
                name: [{ required: true, message: '请输入分类名称', trigger: 'blur' }]
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
    watch: {
        form(val) {
            this.formData = {
                ...val
            }
            this.$refs.form && this.$refs.form.clearValidate()
        }
    },
    created() {
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
        handleSubmit() {
            this.$refs.form.validate(vaild => {
                if (vaild) {
                    this.loading = true
                    if (!this.formData.id) {
                        addTag(this.formData).then(res => {
                            this.$message.success('新增成功')
                            this.refresh()
                            this.loading = false
                        }).catch(() => {
                            this.loading = false
                        })
                    } else {
                        modifyTag(this.formData).then(res => {
                            this.$message.success('修改成功')
                            this.refresh()
                            this.loading = false
                        }).catch(() => {
                            this.loading = false
                        })
                    }
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
