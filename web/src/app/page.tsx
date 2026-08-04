import WebcamBox from "../components/webcamBox";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12 text-white">
      <section className="mx-auto max-w-4xl py-12">
        <p className="text-sm font-semibold uppercase tracking-wide text-cyan-300">
          Browser Based Face Anonymizer
          </p>
        
        <h1  className="mt-4 text-4xl font-bold">
          Face detector tool
          </h1>
        <p className="mt-6 max-w-2xl text-lg text-slate-300">
          A tool used to blur faces effectively You can use it to blur all faces detected,
          eventually maybe just individual faces, but for now all.
        </p>
      </section>

      <section className="mx-auto max-w-4xl py-12">
        <h2  className="mt-4 text-2xl font-bold">
          Live Webcam Demo
        </h2>
        <p>This section will eventually let users test face blur live to see how it works, maybe mess
          around with the type of faceblur/filters available (basic faceblur is available first)
        </p>
        
        <div className="mt-6">
          <WebcamBox />
        </div>
      </section>

      <section className="mx-auto max-w-4xl py-12">
        <h2  className="mt-4 text-2xl font-bold">
          Upload Video
          </h2>
        <p>This section will eventually let users upload and process their video.</p>
      </section>

      {/* will fix this later to include a hypertext link or maybe even a cool button for the repo link */}
      <section className="mx-auto max-w-4xl py-12">
        <h2  className="mt-4 text-2xl font-bold">
          Github Repo Link
          </h2>
        <p>This is a link to the github repo, you can clone it and use it directly on your own machine if you want or just look around!</p>
      </section>
    </main>
  );
}