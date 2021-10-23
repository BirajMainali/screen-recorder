const __ = document.querySelector.bind(document);
const start = async () => {

    const stream = await navigator.mediaDevices.getDisplayMedia({
        video: {
            mediaSource: "screen",
        },
    });
    const Chuks = [];
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.ondataavailable = (e) => {
        Chuks.push(e.data);
    };
    mediaRecorder.start();
    mediaRecorder.onstop = async (e) => {
        __("video").src = URL.createObjectURL(
            new Blob(Chuks, {
                type: Chuks[0].type,
            })
        );
    };
};


__(".start__recording").addEventListener('click', start)