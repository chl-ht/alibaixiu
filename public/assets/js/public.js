$.ajax({
	type: 'get',
	url: '/posts/random',
	success: function (response) {
		var randomTpl = `
			{{each data}}
			<li>
			  <a href="detail.html?id={{$value._id}}">
			    <p class="title">{{$value.title}}</p>
			    <p class="reading">阅读({{$value.meta.views}})</p>
			    <div class="pic">
			      <img src="{{$value.thumbnail}}" alt="">
			    </div>
			  </a>
			</li>
			{{/each}}
		`;
		var html = template.render(randomTpl, {data: response});
		$('#randomBox').html(html)
	}
})
$.ajax({
	type: 'get',
	url: '/comments/lasted',
	success: function (response) {
		var commentTpl = `
			{{each data}}
			<li>
			  <a href="javascript:;">
			    <div class="avatar">
			      <img src="{{$value.author.avatar}}" alt="">
			    </div>
			    <div class="txt">
			      <p>
			        <span>{{$value.author.nickName}}</span>{{$imports.formateDate($value.createAt)}}说:
			      </p>
			      <p>{{$value.content}}</p>
			    </div>
			  </a>
			</li>
			{{/each}}
		`;
		var html = template.render(commentTpl, {data: response});
		$('#commentBox').html(html);
	}
})
$.ajax({
	type: 'get',
	url: '/categories',
	success: function (response) {
		var navTpl = `
			{{each data}}
			<li>
				<a href="list.html?categoryId={{$value._id}}">
					<i class="fa {{$value.className}}"></i>{{$value.title}}
				</a>
			</li>
			{{/each}}
		`;
		var html = template.render(navTpl, {data: response});
		$('#navBox').html(html)
		$('#topNavBox').html(html)  //顶部导航栏（缩小窗口可以看见）
	}
})
function getUrlParams(name) {  //查询获取到的参数，通过split方法将字符串转化为数组
  let arr = location.search.substr(1).split('&')
  for (let index = 0; index < arr.length; index++) {
    let tmp = arr[index].split('=')
    if (name == tmp[0]) {
      return tmp[1]
    }
  }
  return false
}
