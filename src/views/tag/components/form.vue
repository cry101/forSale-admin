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
            <el-form-item label="分类名称" prop="name">
                <el-input v-model="formData.name" />
            </el-form-item>
            <el-form-item label="分类编码" prop="code">
                <el-input v-model="formData.code" />
            </el-form-item>
            <el-form-item label="排序" prop="sort">
                <el-input v-model="formData.sort" type="number" />
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
        },
        company_id: {
            type: String
        }
    },
    data() {
        return {
            loading: false,
            formData: {
                name: '',
                company_id: '',
                code: '',
                sort: 0
            },
            rules: {
                name: [{ required: true, message: '请输入分类名称', trigger: 'blur' }],
                code: [{ required: true, message: '请输入分类编码', trigger: 'blur' }]
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
        visible() {
            if (this.form) {
                this.formData = {
                    ...this.form
                }
            } else {
                this.formData = {
                    name: '',
                    code: '',
                    sort: 0
                }
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
                        addTag({
                            ...this.formData,
                            company_id: this.company_id
                        }).then(res => {
                            this.$message.success('新增成功')
                            this.refresh()
                            this.loading = false
                        }).catch(() => {
                            this.loading = false
                        })
                    } else {
                        modifyTag({
                            ...this.formData,
                            company_id: this.company_id
                        }).then(res => {
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
