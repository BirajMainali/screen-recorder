const __ = document.querySelector.bind(document);

const sessionManager = async () => {
    return {
        stream: await navigator.mediaDevices.getDisplayMedia({video: {mediaSource: "screen",},}),
        chunks: [],
        renderer: __("video"),
        toggleRecordingState: function (state = true) {
            const startRecordElem = __(".start__recording");
            if (state) {
                const sessionInfoElem = __("#session--name");
                startRecordElem.setAttribute("disabled", true);
                startRecordElem.textContent = (!sessionInfoElem.value) ? "Recording" : sessionInfoElem.value;
            } else {
                startRecordElem.removeAttribute("disabled");
                startRecordElem.textContent = " Start Recording";
            }
        },
        startRecording: async function () {
            this.toggleRecordingState();
            const mediaRecorder = new MediaRecorder(this.stream);
            mediaRecorder.ondataavailable = (e) => {
                console.log(e.data);
                this.chunks.push(e.data);
            }
            mediaRecorder.start();
            mediaRecorder.onstop = async () => {
                this.toggleRecordingState(false);
                this.renderer.src = URL.createObjectURL(
                    new Blob(this.chunks, {
                        type: this.chunks[0].type,
                    })
                )
            }
        }

    }
};
__(".start__recording").addEventListener('click', async _ => {
    await (await sessionManager()).startRecording()
});

