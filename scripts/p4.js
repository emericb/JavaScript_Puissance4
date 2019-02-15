$.fn.P4 = function(nb_y, nb_x, jone, jtwo, color_one, color_two) {
    var statusPlugin = true;
    var current = null;
    var status = true;
    var text = "Au tour de ";
    var countOne = 0;
    var countTwo = 0;
    var currentPlayer = jone;
    var nbToken = nb_y * nb_x;


    function init() {
        $("body").append("<div class=\"container-fluid\">");
        $(".container-fluid").append("<div class=\"row\">\n" +
            "\t\t\t<input class=\"form-control col-md-2 offset-2 nameP1\" name=\"nameP1\" type=\"text\" placeholder=\"Name player one\">\n" +
            "\t\t\t<input class=\"form-control col-md-2 offset-4 nameP2\" name=\"nameP2\" type=\"text\" placeholder=\"Name player two\">\n" +
            "\t\t</div>\n" +
            "\t\t<div class=\"row\">\n" +
            "\t\t\t<select class=\"custom-select custom-select-lg col-md-2 offset-2 colorP1\">\n" +
            "\t\t\t\t<option value=\"#00439F\">Blue</option>\n" +
            "\t\t\t\t<option value=\"#CC0000\" selected>Red</option>\n" +
            "\t\t\t\t<option value=\"#0E9F00\">Green</option>\n" +
            "\t\t\t\t<option value=\"#EDD400\">Yellow</option>\n" +
            "\t\t\t\t<option value=\"#B50274\">Purple</option>\n" +
            "\t\t\t</select>\n" +
            "\n" +
            "\t\t\t<select class=\"custom-select custom-select-lg col-md-1 offset-1 gridSize\">\n" +
            "\t\t\t\t<option value=\"7\" selected>7</option>\n" +
            "\t\t\t\t<option value=\"8\">8</option>\n" +
            "\t\t\t\t<option value=\"9\">9</option>\n" +
            "\t\t\t\t<option value=\"10\">10</option>\n" +
            "\t\t\t\t<option value=\"14\">14</option>\n" +
            "\t\t\t</select><p class=\"cross\">x</p>\n" +
            "\n" +
            "\t\t\t<select class=\"custom-select custom-select-lg col-md-1 gridSize2\">\n" +
            "\t\t\t\t<option value=\"6\" selected>6</option>\n" +
            "\t\t\t\t<option value=\"7\">7</option>\n" +
            "\t\t\t\t<option value=\"8\">8</option>\n" +
            "\t\t\t\t<option value=\"9\">9</option>\n" +
            "\t\t\t\t<option value=\"13\">13</option>\n" +
            "\t\t\t</select>\n" +
            "\n" +
            "\t\t\t<select class=\"custom-select custom-select-lg col-md-2 offset-1 colorP2\">\n" +
            "\t\t\t\t<option value=\"#00439F\">Blue</option>\n" +
            "\t\t\t\t<option value=\"#CC0000\">Red</option>\n" +
            "\t\t\t\t<option value=\"#0E9F00\">Green</option>\n" +
            "\t\t\t\t<option value=\"#EDD400\" selected>Yellow</option>\n" +
            "\t\t\t\t<option value=\"#B50274\">Purple</option>\n" +
            "\t\t\t</select>\n" +
            "\t\t\t<button type=\"button\" class=\"btn btn-dark btnsbm\">Submit</button>\n" +
            "\t\t</div>\n" +
            "\t</div>"
        );
        var replay = $("<button>Rejouer</button>").addClass("replay");
        $("header").prepend(replay);
        var back = $("<button>Back</button>").addClass("back");
        $("header").append(back);
        $(".btnsbm").click(function() {

            nb_x = $(".gridSize").val();
            nb_y = $(".gridSize2").val();
            color_one = $(".colorP1").val();
            color_two = $(".colorP2").val();
            jone = $(".nameP1").val();
            jtwo = $(".nameP2").val();
            currentPlayer = jone;
            nbToken = nb_y * nb_x;

            $("body").append("<p class='jname content'>" + text + currentPlayer + "</p>");

            if (color_one == color_two) {

                $("body").prepend("<section class='alert'><p>L'un des joueurs doit changer de couleur</p></section>");
                function remove() {
                    $(".alert").remove();
                }setTimeout(remove, 3000);
            }

            if (jone == jtwo) {

                $("body").prepend("<section class='alert'><p>L'un des joueurs doit changer de nom</p></section>");
                function remove() {
                    $(".alert").remove();
                }setTimeout(remove, 3000);
            }
            else {
                $("body").append("<table></table>");
                for (var i = 0; i < nb_y; i++) {

                    $("table").append("<tr id='" + i + "tr'></tr>");
                    for (var j = 0; j < nb_x; j++) {
                        var td = $("<td></td>").attr("data-position", i + "-" + j);
                        $("#" + i + "tr").append(td);
                    }
                }
                $("body").append("<section class='score'><p class='" + jone + "'>" +
                    jone + "</p><p class='" + jtwo + "'>" + jtwo + "</p></section>");
                $(".btnsbm").hide();
                $(".colorP1").hide();
                $(".colorP2").hide();
                $(".gridSize").hide();
                $(".gridSize2").hide();
                $(".nameP1").hide();
                $(".nameP2").hide();
                $(".cross").hide();
                $("td").on("click", function() {
                    if (statusPlugin) {
                        position($(this), nb_y, nb_x);
                    }
                });
            }
        })
    }
    init();


    $(".replay").on("click", function(e) {
        statusPlugin = false;
        $("span").fadeOut(400, function() {
            $(".btnsbm").show();
            $(".colorP1").show();
            $(".colorP2").show();
            $(".gridSize").show();
            $(".gridSize2").show();
            $(".nameP1").show();
            $(".nameP2").show();
            $(".cross").show();
        });
        $("td").removeClass("active");
        $("table").remove();
        $(".score").remove();
        $(".btnsbm").show();
        $(".jname").remove();

        setTimeout(function(){ statusPlugin = true; }, 1000);
    });

    function position(that, nb_y, nb_x) {
        var index = that.data("position").split("-");
        var posy = index[0];
        var posx = index[1];
        for (var countY = nb_y; countY >= 0; countY--) {
            current =  $("[data-position='"+ (countY - 1) +"-"+ posx +"']");
            var currentclass = current.attr("class");
            if(currentclass != "active") {
                var color = (status) ? color_one : color_two;
                var tokensize = $(".token").length;
                if (countY === 0) { return; }
                current.addClass("active").append("<span class='token'></span>");
                current.find("span").animate({marginTop: 0},"slow").css("background-color", color);
                status = !status;
                currentPlayer = (status) ? jone : jtwo;
                $(".jname").text(text + currentPlayer);
                status = !status;
                algorithm(nb_y ,nb_x ,countY, posx, posy);
                status = !status;
                if (nbToken === (tokensize +1)) {
                    alert("C'est plein frr ! " +
                        "Faut rejouer !");
                    statusPlugin = !statusPlugin;
                    return;
                }
                return;
            }
        }
    }

    function algorithm(nb_y, nb_x, countY, posx, posy) {
        vertical(nb_y , countY, posx);
        horizontal(nb_y ,nb_x , countY, posx, posy);
        diagoleft(nb_y ,countY , posx);
        diagoright(nb_y ,countY , posx);
    }

    function vertical(nb_y, y, posx) {
        var verti = 0;
        y--;
        var rgb = $("[data-position='"+ y +"-"+ posx +"']").find("span").css("background-color");
        for (var countY = y; countY < nb_y; countY++) {
            var morergb = $("[data-position='"+ countY +"-"+ posx +"']").find("span").css("background-color");
            if (rgb === morergb) {
                verti++;
                if (verti === 4) {
                    statusPlugin = !statusPlugin;
                    win();
                    return;
                }
            }
            else {
                return;
            }
        }
    }

    function horizontal(nb_y, nb_x, y, posx, posy) {
        var hori = 0;
        y--;
        nb_x = (nb_x -1);
        var rgbh = $("[data-position='"+ y +"-"+ posx +"']").find("span").css("background-color");
        for (var countX = posx; countX <= nb_x; countX++) {
            var morergbh = $("[data-position='"+ y +"-"+ countX +"']").find("span").css("background-color");
            if (rgbh === morergbh) {
                hori++;
                current = $("[data-position='"+ y +"-"+ countX +"']").find("span")[0];
                if (hori === 4) {
                    statusPlugin = !statusPlugin;
                    win();
                    return;
                }
                else {
                    horileft(countX, y);
                }
            }
            else {
                return;
            }
        }
    }

    function horileft(x, y) {
        var horileft = 0;
        var morergbh = $("[data-position='"+ y +"-"+ x + "']").find("span").css("background-color");
        for (var countX = x; countX >= 0; countX--) {
            var currentrgb = $("[data-position='"+ y +"-"+ countX +"']").find("span").css("background-color");
            if (currentrgb === morergbh) {
                horileft++;
                if (horileft === 4) {
                    statusPlugin = !statusPlugin;
                    win();
                    return;
                }
            }
            else {
                horileft = 0;
                return;
            }
        }
    }

    function diagoleft(nb_y, y, posx) {
        y--;
        var diagoleft = 0;
        var morergbh = $("[data-position='"+ y +"-"+ posx +"']").find("span").css("background-color");
        for (var countY = posx; countY <= nb_y; countY++) {
            var currentrgb = $("[data-position='"+ y + "-"+ countY +"']").find("span").css("background-color");
            if (currentrgb === morergbh) {
                diagoleft++;
                if (diagoleft >= 4) {
                    statusPlugin = !statusPlugin;
                    win();
                    return;
                }
                else {
                    leftBottom(y, countY);
                }
            }
            else {
                return;
            }
            y--;
        }
    }

    function leftBottom(x, y) {
        var morergb = $("[data-position='"+ x + "-"+ y +"']").find("span").css("background-color");
        var diagoBF = 0;
        for(var countY = y; countY >= 0; countY--) {
            var rgbpos = $("[data-position='"+ x + "-"+ countY +"']").find("span").css("background-color");
            if (rgbpos === morergb) {
                diagoBF++;
                if (diagoBF >= 4) {
                    statusPlugin = !statusPlugin;
                    win();
                    return true;
                }
            }
            else {
                return;
            }
            x++;
        }
    }

    function diagoright(nb_y, y, posx) {
        y--;
        var countDR = 0;
        var morergbh = $("[data-position='"+ y +"-"+ posx +"']").find("span").css("background-color");
        for (var k = posx; k <= nb_y; k++) {
            var currentrgb = $("[data-position='"+ y + "-"+ k +"']").find("span").css("background-color");
            if (currentrgb === morergbh) {
                countDR++;
                if (countDR >= 4) {
                    statusPlugin = !statusPlugin;
                    win();
                    return;
                }
                else {
                    rightBottom(y, k);
                }
            }
            else {
                return;
            }
            y++;
        }
    }

    function rightBottom(x, y) {
        var morergb = $("[data-position='"+ x + "-"+ y +"']").find("span").css("background-color");
        var diagoBF = 0;
        for(var countY = y; countY >= 0; countY--) {
            var rgbpos = $("[data-position='"+ x + "-"+ countY +"']").find("span").css("background-color");
            if (rgbpos === morergb) {
                diagoBF++;
                if (diagoBF >= 4) {
                    statusPlugin = !statusPlugin;
                    win();
                    return true;
                }
            }
            else {
                return;
            }
            x--;
        }
    }

    function win() {
        currentPlayer = (status) ? jone : jtwo;
        $("body").prepend("<section class='alert'><p>" + currentPlayer +  " Gagne la partie !!!" + "</p></section>");
        if (currentPlayer === jone) {
            countOne++;
            $("." + currentPlayer).text(currentPlayer + " /" + countOne);
            console.log("mdr");
        }
        if (currentPlayer === jtwo) {
            countTwo++;
            $("." + currentPlayer).text(currentPlayer +" /"+ countTwo);
            console.log("lol");
        }

        function remove() {
            $(".alert").remove();
        }setTimeout(remove, 3000);
    }

    $(".back").on("click", function(e) {
        if($(current).parent().length === 0) {
            return;
        }
        if (statusPlugin) {
            $(current).parent().removeClass();
            $(current).remove();
            var color = (status) ? color_two : color_one;
            currentPlayer = (status) ? jtwo : jone;
            $(".jname").text(text + currentPlayer);
            status = !status;
        }
    });
};

$(function() {
    $("window").P4($(".gridSize").val(), $(".gridSize2").val(), $(".nameP1").val(), $(".nameP2").val(), $(".colorP1").val(), $(".colorP2").val());
});