<template>
    <el-dialog
        center
        :visible.sync="dialogVisible"
        width="660px"
        title="编辑"
        top="60px"
        @close="close"
    >
        <el-form ref="form" :model="formData" :rules="rules" label-width="120px">
            <el-form-item label="产品名称" prop="name">
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
import { addProduct, modifyProduct } from '@/api/company'

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
                price: ''
            },
            rules: {
                name: [{ required: true, message: '请输入产品名称', trigger: 'blur' }]
            }
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
    methods: {
        handleSubmit() {
            this.$refs.form.validate(vaild => {
                if (vaild) {
                    this.loading = true
                    if (!this.formData.id) {
                        addProduct({
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
                        modifyProduct({
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
