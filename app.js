const __ = document.querySelector.bind(document);
const start = async () => {

    const stream = await navigator.mediaDevices.getDisplayMedia({
        video: {
            mediaSource: "screen",
        },
    });
    const Chunk = [];
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.ondataavailable = (e) => {
        Chunk.push(e.data);
    };
    mediaRecorder.start();
    mediaRecorder.onstop = async (e) => {
        __("video").src = URL.createObjectURL(
            new Blob(Chunk, {
                type: Chunk[0].type,
            })
        );
    };
};


__(".start__recording").addEventListener('click', start)