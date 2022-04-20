(function () {
    const FLOWER = `<div class="sunflower">
        <div class="sunflower_overlay sunflower_overlay_3">
            <div class="sunflower_core"></div>
        </div>
        <div class="sunflower_overlay sunflower_overlay_1">

        </div>
        <div class="sunflower_overlay sunflower_overlay_2">

        </div>
        
    </div>`;

    for (let elem of document.querySelectorAll(".canvas")) {
        for (let i = 0; i < 1; i++) {
            elem.innerHTML += FLOWER;
        }
    }


    const GLOB_PETAL_COUNT = 16;

    function insert_multiple_overlays(parent_container, child_classes, count, alternate_rotation) {
        function insert(parent_container, child_classes, rotation) {
            const new_element = document.createElement("div");
            new_element.classList.add("mini_overlay");
            new_element.innerHTML = `<div class="${child_classes}"></div>`;
            new_element.style.transform = `rotate(${rotation}deg)`;
            parent_container.append(new_element);
        }

        // based on the number of petals, take 360 degrees divided by petal count as the unit angle, and iterate from there.
        // if the alternate argument is true, all the petals will rotate an extra half of the unit angle.
        for (let i = 0; i < count; i++) {
            const unit_rotation = 360 / count;
            if (!alternate_rotation) {
                insert(parent_container, child_classes, unit_rotation * i);
            } else {
                insert(parent_container, child_classes, unit_rotation * (i + 1 / 2));
            }
        }
    }

    for (let element of document.querySelectorAll(".sunflower_overlay_1")) {
        insert_multiple_overlays(element, "petal outer_petal", GLOB_PETAL_COUNT);
    }
    for (let element of document.querySelectorAll(".sunflower_overlay_2")) {
        insert_multiple_overlays(element, "petal inner_petal", GLOB_PETAL_COUNT, true);
    }

    // function only_1_overlay(element) {
    //     function display(mode) {
    //         for (let _ of document.querySelectorAll(".sunflower_core")) {
    //             _.style.display = mode;
    //         }
    //         for (let _ of document.querySelectorAll(".mini_overlay")) {
    //             _.style.display = mode;
    //         }
    //     }
    //
    //     display("none");
    //     element.style.display = "flex";
    //     setTimeout(() => display("flex"), 2000)
    // }
    //
    //
    //     $(document).on("click", ".mini_overlay", function () {
    //         only_1_overlay(this);
    //     });
})();