const __ = document.querySelector.bind(document);
start = async () => {

    const stream = await navigator.mediaDevices.getDisplayMedia({
        video: {
            mediaSource: "screen",
        },
    });
    const chuks = [];
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.ondataavailable = (e) => {
        chuks.push(e.data);
    };
    mediaRecorder.start();
    mediaRecorder.onstop = (e) => {
        __("video").src = URL.createObjectURL(
            new Blob(chuks, {
                type: chuks[0].type,
            })
        );
    };
};
__(".start__recording").addEventListener('click', start)