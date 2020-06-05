$(function(){
    //个人定制开始，规定一个页面只能加载15条数据

    var numPerPage = 10;
    //先要获取一共多少数据，向后台发送请求
   /* $.get('',{},function(res){
        var totalLength =JSON.parse(res).dataLength;
        var pageCount = Math.ceil(totalLength/numPerPage);//得到页数，然后动态增加分页器
        inserHtml(pageCount,1);
        bindEvent(pageCount);
        //当页面绘制完成后，加载第一页的数据
        getData(1);
    });*/
    // 默认测试
    /* var pageCount=15;
     inserHtml(pageCount,1);
     bindEvent(pageCount);*/

    /*
        绘制页面的
        page表示一共有多少页
        current默认加载第几页
    */
    function inserHtml(page,current){
        var obj = $(".ts-page");
        obj.empty();
        if(current > 1){
            obj.append('<span class="tspage-start">首页</span>');
            obj.append('<span class="tspage-before">上一页</span>');
        }else{
            obj.remove('.tspage-start');
            obj.append('<span class="tspage-before disable">上一页</span>');
        }
        if(current>3 && current <= page && page>5){
            obj.append('<span class="tspage-ell">...</span>');
        }
        var start = current-2, end= current+2; //中间显示5个
        if(start >1 && current < 4||current == 1){
            end++; //前面会没有省略号。
        }
        if(current > page-2 && current <= page){
            start--; //后面的省略号消失
        }
        for(;start<=end;start++){
            if(start<=page && start >=1){
                if(start != current){
                    obj.append('<span class="page">'+start+'</span>');
                }else{
                    obj.append('<span class="page on">'+start+'</span>');
                }
            }
        }
        if(current+2<page && current >=1 && page>4){
            obj.append('<span class="tspage-ell">...</span>');
        }
        if(current<page){
            obj.append('<span class="tspage-after">下一页</span>');
            obj.append('<span class="tspage-end">尾页</span>');
        }else{
            obj.remove('.tspage-end');
            obj.append('<span class="tspage-after disable">下一页</span>');
        }
    }
    /*
        给分页器工具绑定事件监听
        page表示需要给多少个页面添加事件监听
    */
    function bindEvent(page){
        var obj = $(".ts-page");
        obj.on('click','.page',function(){
            var currentPage = parseInt($(this).text());
            inserHtml(currentPage,page);
            inserHtml(page,currentPage);
            //接下来就是获取后台传来数据的ajax函数+数据适配
            getData(currentPage);
        });
        obj.on('click','.tspage-before',function(){
            var currentPage = parseInt(obj.children('.on').text());
            if(currentPage>1){
                inserHtml(page,currentPage-1);
                //接下来就是获取后台传来数据的ajax函数+数据适配
                getData(currentPage-1);
            }

        });
        obj.on('click','.tspage-after',function(){
            var currentPage = parseInt(obj.children('.on').text());
            if(currentPage<page){
                inserHtml(page,currentPage+1);
                //接下来就是获取后台传来数据的ajax函数+数据适配
                getData(currentPage+1);
            }
        });
        obj.on('click','.tspage-start',function(){
            inserHtml(page,1);
            //接下来就是获取后台传来数据的ajax函数+数据适配
            getData(1);
        });
        obj.on('click','.tspage-end',function(){
            inserHtml(page,page);
            //接下来就是获取后台传来数据的ajax函数+数据适配
            getData(page);
        });
    }

    // 根据选择的页码数处理数据
    function getData(num){
       $.this.$axios.get('blog/list'+num, function(data){
           var allDataArr=JSON.parse(data).list;
            //根据数据，将元素创建到页面中
           var  outDiv=document.querySelector('.out');
           if(!outDiv){
              //如果没有outDiv，创建一个
               outDiv=document.createElement('div');
               outDiv.className='out';
               outDiv.style.cssText='position:relative;margin:0 auto; ';
               document.body.appendChild(outDiv);
               //根据数据，创建inDivs
               for(var i=0;i<allDataArr.length;i++){
                   var inDivs=document.createElement('div');
                   inDivs.className='in';
                   inDivs.style.cssText='float:left;width:280px;height:250px;border:1px  solid black;margin:10px ;' ;
                    //添加内容
                   var neirongStr="<img  src='"+allDataArr[i].headimgurl+"'>"+"<span  style='vertical-align: top'>"+allDataArr[i].sectiontitle+"</span>";
                   inDivs.innerHTML=neirongStr;

                   outDiv.appendChild(inDivs);
               }
           }else{
              //如果已经存在outDiv，那就变更里边的数据
               outDiv.innerHTML='';
           }
       });
    }
});