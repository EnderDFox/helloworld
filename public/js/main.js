var filesLen;
function init(_filesLen) {
    console.log("{filesLen}", _filesLen);
    filesLen = _filesLen;
}
function itemMouseOver(idIndex) {
    // console.log("btn_over "+id);
    // $("#div_item_"+id).find(".new_name").append("I would like to say:");
    // $("#div_item_"+id).find(".new_name").addClass("bg_yellow");
    $("#div_item_" + idIndex).addClass("bg_yellow");
}
function itemMouseOut(idIndex) {
    $("#div_item_" + idIndex).removeClass("bg_yellow");
}

function onSelectAll() {
    var isSelectedAll = true;
    for (var i = 0; i < filesLen; i++) {
        var currSelected = $("#div_item_" + i).find(".checkbox").prop("checked");
        console.log(i, currSelected);
        if (currSelected == false) {
            $("#div_item_" + i).find(".checkbox").prop("checked", true);
            isSelectedAll = false;
        }
    }
    if (isSelectedAll) {
        for (i = 0; i < filesLen; i++) {
            $("#div_item_" + i).find(".checkbox").prop("checked", false);
        }
    }
}
function onResetName(idIndex) {
    var div = $("#div_item_" + idIndex);
    div.find(".preview_name_input").prop("value", div.find(".curr_name").text());
}
function onBtnClick(kind, idIndex) {
    var div = $("#div_item_" + idIndex);
    if (kind == 0) {
        if(div.find(".curr_name").text() == div.find(".preview_name_input").prop("value")){
            alert("Name have not changed");
        }else{
            $.ajax({
                url: "/ChangeFileName/change",
                type: 'POST',
                data: "idIndex="+idIndex+"&newName="+div.find(".preview_name_input").prop("value"),
                // data: "{idIndex:"+idIndex+"}",
                success: function(data){
                    div.find(".curr_name").text(div.find(".preview_name_input").prop("value"));
                },
                error: function(){
                    console.log("ajax error");
                }
            });
        }
    } else {
        var currName = div.find(".preview_name_input").prop("value");
        div.find(".preview_name_input").prop("value", changeName(kind, currName));
    }
}

function changeName(kind, currName) {
    switch (kind) {
        case 1:
            if (currName.indexOf("-") == -1) {
                var reg = /[^0-9]+/g;
                var rs_unNum = reg.exec(currName);
                reg = /[0-9]+/g;
                var rs_num = reg.exec(currName);
                return rs_unNum + "-" + rs_num;
            }
            break;
        case 2:
            return currName.toLowerCase();
            break;
        case 3:
            var currNameSp = currName.split(" ");
            if (currNameSp.length == 1) {
                return;
            } else {
                var temp = currNameSp[1];
                currNameSp[1] = currNameSp[0];
                currNameSp[0] = temp;
                return currNameSp.join(" ");
            }
            break;
        case 4:
            var currNameSp = currName.split(" ");
            if (currNameSp.length == 1) {
                return;
            } else {
                currNameSp.reverse();
                return currNameSp.join(" ");
            }
            break;
    }
    return currName;
}