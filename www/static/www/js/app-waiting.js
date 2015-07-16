$(function() {
	setInterval("getGitCodeCheck()", 3000);
});

function getGitCodeCheck() {
	var tenantName = $('#tenantName').val();
	var service_name = $('#service_name').val();
	if (service_name != "" && service_name != undefined) {
		$.ajax({
			type : "GET",
			url : "/ajax/" + tenantName + "/" + service_name + "/check/",
			cache : false,
			success : function(msg) {
				var dataObj = msg;
				if (dataObj["status"] == "checked") {
					window.location.href = "/apps/" + tenantName + "/"
							+ service_name + "/app-language/"
				} else if (dataObj["status"] == "check_error") {
					$("#git_code_upload").html("语言未识别，请重新提交代码...")
				}
			},
			error : function() {
				// alert("系统异常");
			}
		})
	}
}

function app_create_delete(){
	var tenantName = $('#tenantName').val();
	var service_name = $('#service_name').val();
	if (service_name != "" && service_name != undefined) {
		var statu = confirm("确定删除当前服务吗?");
		if (statu) {
			$.ajax({
				type : "POST",
				url : "/ajax/" + tenantName + "/" + service_name + "/manage/",
				data : "action=delete",
				cache : false,
				beforeSend : function(xhr, settings) {
					var csrftoken = $.cookie('csrftoken');
					xhr.setRequestHeader("X-CSRFToken", csrftoken);
				},
				success : function(msg) {
					var dataObj = msg
					if (dataObj["status"] == "success") {
						alert("操作成功")
						window.location.href = "/apps/" + tenantName
					} else if (dataObj["status"] == "dependency") {
						alert("当前服务被依赖不能删除")
					} else {
						alert("操作失败")
					}
				},
				error : function() {
					alert("系统异常");
				}
			})
		}
	}
}