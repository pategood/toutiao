
import * as httpAgent from 'assets/js/http'
import { iframeDownload } from '@core/utils'

export default (url, params, self, rollUrl = '/') => {
  const requestId = Math.ceil(Math.random() * 100000000)
  const loading = self.$loading({
    lock: true,
    text: 'Loading',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.7)'
  })
  let intervalObj
  httpAgent.POST(url, Object.assign(params, {
    requestId
  })).subscribe((success) => {
    if (url.indexOf('cloudadmin') > -1) {
      rollUrl = '/cloudadmin/admin/'
    } else if (url.indexOf('mainlineadmin') > -1) {
      rollUrl = '/mainlineadmin/'
    } else if (url.indexOf('omsorderadmin') > -1) {
      rollUrl = '/omsorderadmin/admin/'
    } else {
      rollUrl = '/'
    }
    let redisType
    if (url.indexOf('omsorderadmin') > -1) {
      redisType = 'export_oms'
    } else {
      redisType = 'dataexport'
    }
    if (success.data &&　success.response.data.code === 0) {
      let url
      let data
      url = `${rollUrl}searchExportIsCompleted?requestId=${requestId}&redisType=${success.data.redisType || redisType}`
      intervalObj = setInterval(async () => {
        httpAgent.POST(url, {
          redisType: success.data.redisType
        }, {

        })
          .subscribe((res) => {
            if (res.response.data.code == 0) {
              loading.close()
              clearInterval(intervalObj)   
              // rollUrl + 
              let downloadUrl 
              if (url.indexOf('cloudadmin') > -1) {
                downloadUrl = `${'/cloudadmin/admin/' + 'download' + '?fileName='}${res.data}`
              } else if (url.indexOf('mainlineadmin') > -1) {
                downloadUrl = `${'/mainlineadmin/' + 'download' + '?fileName='}${res.data}`    
              } else if (url.indexOf('tmsadmin/admin/api') > -1) {
                downloadUrl = `${'/tmsadmin/admin/api/' + 'download' + '?fileName='}${res.data}`    
              } else if (url.indexOf('omsorderadmin') > -1) {
                downloadUrl = `${'/omsorderadmin/admin/' + 'download' + '?fileName='}${res.data}`    
              } else {
                downloadUrl = `${'/wrmstransportadmin/admin/' + 'download' + '?fileName='}${res.data}`
              }
              iframeDownload(downloadUrl)
            } else if (res.response.data.code == 1) {
              loading.close()
              clearInterval(intervalObj)
            }
          }, (err) => {
            loading.close()
            clearInterval(intervalObj)
          })
      }, 3000)
    } else {
      self.$message({
        message: '导出失败',
        type: 'error'
      })
    }
  }, (error) => {
    loading.close()
  })
}
