//app.js
App({
  onLaunch: function () {
    var that =this
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
        env:"a-project-e811ce"
      })
    }

    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if(res.code){
          wx.request({
            //指定到后台操作接口
            url:"",
            data:{
              code:res.code
            },
            header:{
              'Content-Type':'application/json'
            },
            success:function(res){
              var res=JSON.parse(res.data)
              //将前端openID存到了wx.stroge里面
              wx.storge({
                key:"openid",
                data:res.openid
              });
              that.globalData.userInfo=res.openid
            }
          })
        }else{
          console.log("登陆失败"+res.errMsg)
        }
      }
    })
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })

  },
  globalData:{
    userInfo:null,
    openid:""
  }
})
