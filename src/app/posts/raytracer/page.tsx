import { JSX } from "react";

export default function Page(): JSX.Element {
  return (
    <div className="flex flex-col">
      <h3>Building a raytracer in Rust</h3>
      <p className="mb-[18px]">November 25, 2024</p>
      <p className="mb-[18px]">
        I recently went through the process of building a basic raytracing
        application from first principles. I&apos;ve held onto an interest in
        graphics programming and understanding both the historical steps it took
        to develop as well as the cutting-edge modern techniques engineers in
        the field use to optimize and squeeze performance out of their GPUs, and
        with raytracing being one of the oldest techniques for rendering for
        rendering digital scenes (as well as arguably the most inspired by the
        analogous optical process in reality), it seemed like a logical place to
        start. The dominant language for graphics programming is C++, however,
        given my familiarity with Rust and its similar benefits towards
        performance and bridging a gap between low level and high level
        programming, I chose to go ahead and use it to build the project.
      </p>
      <h4>The Inner Workings of a Raytracer</h4>
      <h4>Using the Right Polymorphism in Rust</h4>
      <h4>Bug of the Project (BOTP)!</h4>
      <p className="mb-[18px]">
        Debugging raytracing seems to me to be a uniquely entertaining and
        challenging undertaking. You are often left deciphering a wildly
        unexpected or inaccurate end image and left without much clue as to what
        bug in the mass of accumulating math calculations led to this result.
        The fact that raytracing itself is inherently recursive by following a
        ray bouncing around the scene many layers deep does not help this sense
        of a &quot;black box&quot; predicament.
      </p>
      <p>
        The bug of note that I&apos;ll mention here came about when I noticed
        some shadowing visual artifacts left over in some of my scenes. The
        image below gives a good example of the additional darkening cast by the
        projection of one quadrilateral plane onto another below it.
      </p>
      <p>Image should go HERE</p>
      <p>
        The mechanical origins of shadows in a rendered scene are from a ray
        bouncing between two surfaces repeatedly before eventually escaping to
        terminate in a skybox hit or hitting the upper recursion limit set for
        the program. Each bounce and thus further recursion into the raytracing
        routine adds a darkening factor to the eventual output color for that
        particular ray calculation.
      </p>
      <p>
        It makes sense then that two surfaces close together will produce clear
        shadowing since rays scattered on average like the the surface&apos;s
        normal and are highly likely to collide with the second surface just
        above and vice versa, leading to this exact recursive darkening cycle.
        However, this effect should decrease substantially with additional
        distance between the two surfaces, since more scattering rays will avoid
        collision between the pair surfaces and escape into other parts of the
        scene, avoiding the cycle. In my scene, the shadowing appears to strong
        relative to the distance between the planes.
      </p>
      <p className="mb-[18px]"></p>
      <h4>Further Refinements and Next Steps</h4>
      <p className="mb-[18px]">
        Besides the retrospective design mistakes I mentioned above, there are a
        number of different improvements and/or additions I could add to this
        project. On the performance end, there are plenty of low-hanging gains
        to be made, the most obvious being the introduction of multithreading,
        since the current code has the entire raytracing routine runs in a
        single thread. The routine iterating through tracing rays through each
        distinct pixel in the end image and, within each pixel, sampling across
        separate ray instances; with little shared information, interaction, or
        messages to be passed or synchronized across these entirely independent
        tracing runs, adding in parallelism would be a straightforward refactor
        with immediate benefits to run time. The best tool in Rust for this
        additional is <a href="https://github.com/rayon-rs/rayon">Rayon</a>, a
        lightweight crate for data-parallelism.
      </p>
      <p className="mb-[18px]">
        A separate handy addition would be some sort parser for scene objects
        and information recorded in a JSON format, since the current examples
        require adding geometry, their materials, and initializing the camera by
        hand using the current APIs. Existing standard exist in the industry for
        storing this sort of scene information like{" "}
        <a href="https://en.wikipedia.org/wiki/GlTF">glTF</a> and{" "}
        <a href="https://en.wikipedia.org/wiki/Universal_Scene_Description">
          Universal Scene Description
        </a>{" "}
        among others, but those cater to much more complicated and larger scenes
        featuring animation, multiple cameras, procedurally generated materials,
        and more. For the limited set of features and rendering options
        available in this raytracer, parsing a clearly delineated JSON structure
        would be plenty sufficient.
      </p>
      <p className="mb-[18px]">
        Because modern graphics programming is so tied to optimizing data
        transfer to and processing on the GPU, I think my next steps will
        involve learning more about some real-time rendering techniques and the
        popular graphics APIs being used like CUDA and Vulkan. Although I
        definitely want to (and need to) improve my C++ skills to get exposed to
        and become proficient in the more advanced areas of modern graphics, if
        I wanted to remained in the loop with Rust, there are also some
        interesting open source projects like{" "}
        <a href="https://github.com/Rust-GPU/Rust-CUDA">Rust-CUDA</a> and{" "}
        <a href="https://github.com/Rust-GPU/rust-gpu">
          https://github.com/Rust-GPU/rust-gpu
        </a>{" "}
        undergoing development to either wrap existing graphics APIs or
        providing alternative avenues to interact directly with the GPU using
        Rust as a primary driver. I hope I&apos;ll be able to do some work
        myself contributing to these projects soon!
      </p>
    </div>
  );
}
