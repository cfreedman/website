"use client";

import { JSX, useEffect } from "react";

import hljs from "highlight.js";
import rust from "highlight.js/lib/languages/rust";

hljs.registerLanguage("rust", rust);

const headerCss = "my-[15px] text-[20px]";
const paragraphCss = "my-[25px] text-[16px]";
const codeContainerCss = "w-[100%]";
const codeCss = "w-[100%] p-[40px]";

export default function Page(): JSX.Element {
  useEffect(() => {
    hljs.highlightAll();
  }, []);

  return (
    <div className="flex flex-col">
      <h3 className="mb-[40px] text-[30px] font-semibold underline">
        Building a raytracer in Rust
      </h3>
      <p className="mb-[16px] text-[14px]">November 25, 2024</p>
      <p className={paragraphCss}>
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
      <h4 className={headerCss}>The Inner Working of a Raytracer</h4>
      <p className={paragraphCss}></p>
      <h4 className={headerCss}>Using the Right Polymorphism in Rust</h4>
      <p className={paragraphCss}>
        Implementing some of the fundamental elements in the raytracer offered
        an interesting design decision regarding how to best represent abstract
        sets of type with unifying properties or behavior. Important in this
        setting are <b>geometries</b>, defining the physical boundaries and
        structure of objects in world space, <b>materials</b>, defining how
        light rays interact with objects when they are hit, and <b>textures</b>,
        which assign color values to objects along their surfaces.
      </p>
      <p className={paragraphCss}>
        Geometry must be <i>hittable</i> - rays traversing the scene must be
        able to determine whether or no they will collide with it. Materials
        must be <i>scatterable</i> - upon collision, there must be some way to
        determine how ray will (or will not) scatter off the surface to continue
        traversing the scene. And textures should determine a <i>value</i> or
        color to output at a specific point a ray hits on the surface.
      </p>
      <p className={paragraphCss}>
        The commonalities across the behavior of, for example, a sphere and a
        quad, both geometries and both needing some implementation of this{" "}
        <i>hittable</i> behavior, suggests the need for some abstraction over
        these different subtypes. Rust offers its own take on{" "}
        <b>polymorphism</b> with several differences from other more common
        approaches in object oriented programming. In particular, there is no
        concept of inheritance or subclassing. Instead, Rust uses <b>enums</b>{" "}
        to define abstractions over a closed set of types, <b>generics</b> to
        abstract to different possible types, and <b>traits</b> (the Rust
        version of interfaces) to impose constraints on what some types must
        provide in terms of data and behavior.
      </p>
      <p className={paragraphCss}>
        In its current state, I&apos;m not happy with how I implemented
        materials. I used an enum to define an overarching <code>Material</code>{" "}
        type to wrap the four variants like so
      </p>
      <pre className={codeContainerCss}>
        <code className={`${codeCss} language-rust`}>{`
pub enum Material {
    Lambertian(Lambertian),
    Dielectric(Dielectric),
    Metal(Metal),
    Isotropic(Isotropic),
}
        `}</code>
      </pre>
      <p className={paragraphCss}>
        The four variant types <code>Lambertian</code>, <code>Dielectric</code>,{" "}
        <code>Metal</code>, and <code>Isotropic</code>, then each implemented
        their own individual version of a scatter function, which are used in
        the Material in a match statement to call the correct scatter depending
        on the underlying variant.
      </p>
      <pre className={codeContainerCss}>
        <code>{`
impl Material {
    pub fn scatter(
        &self,
        ray_in: Ray,
        hit_data: &mut HitData,
        attenuation: &mut Vec3,
        scattered: &mut Ray,
    ) -> bool {
        match self {
            Self::Lambertian(lamb) => lamb.scatter(ray_in, hit_data, attenuation, scattered),
            Self::Metal(metal) => metal.scatter(ray_in, hit_data, attenuation, scattered),
            Self::Dielectric(dielectric) => {
                dielectric.scatter(ray_in, hit_data, attenuation, scattered)
            }
            Self::DiffuseLight(_) => false,
            Self::Isotropic(isotropic) => {
                isotropic.scatter(ray_in, hit_data, attenuation, scattered)
            }
        }
    }
  
}

...

impl Lambertian {
    pub fn scatter( ... ) -> bool { ... }

impl Dielectric {
    pub fn scatter( ... ) -> bool { ... }

impl Metal {
    pub fn scatter( ... ) -> bool { ... }

impl Isotropic {
    pub fn scatter( ... ) -> bool { ... }
}         `}</code>
      </pre>
      <p className={paragraphCss}>
        A better solution, I think, would be to define <code>Material</code> as
        a trait with a shared scatter function that participating types must
        implement.
      </p>
      <pre className={codeContainerCss}>
        <code>
          {`
pub trait Material {
    pub fn scatter(
        &self,
        ray_in: Ray,
        hit_data: &mut HitData,
        attenuation: &mut Vec3,
        scattered: &mut Ray,
    ) -> bool {}
}
        `}
        </code>
      </pre>
      <p className={paragraphCss}>
        In looking back, this captures better the abstraction of materials being
        an arbitrary, open number of types bound together by a closed set of
        behavior - exactly how rays should scatter off of them, rather than a
        closed set of types with arbitrary open properties across them. The
        former is a trait (or interface) over types, and the latter is an enum,
        binding types together under one parent representative all variants.
      </p>
      <p className={paragraphCss}>
        In part, some of what drew me first to the enum representation is that,
        provided all the variant implement the Rust <code>Copy</code> trait, it
        can automatically be derived on the enum parent as well. As soon as a
        type implements <code>Copy</code>, this eliminates much of the
        difficulty Rust is famous for involving its memory management rules and
        ownership. Types with <code>Copy</code> can be thought of as purely
        stack-allocated and, in passing them into functions as arguments or
        other execution blocks, it makes no meaningful difference to the
        compiler if you use the value itself or a reference to it. Instead, that
        type is immediately <i>passed-by-value</i> into function calls by the
        Rust compiler.
      </p>
      <p className={paragraphCss}>
        In contast, when refererring to a trait object in the polymorphic way
        necessary for our raytracer, Rust requires us to use a{" "}
        <code>{`Box<dyn Material>`}</code>, which is heap allocatted. In this
        case, all of the particularities of moved ownership and reference
        management come into play, requiring much more careful attention.
        Ultimately though, this is the better abstraction and there no need to
        shy away from the features that, though lending some additional
        difficulty, give Rust much of its safety and power.
      </p>
      <h4 className={headerCss}>Bug of the Project (BOTP)!</h4>
      <p className={paragraphCss}>
        Debugging raytracing seems to me to be a particularly entertaining and
        challenging undertaking. You are often left deciphering a wildly
        unexpected or inaccurate end image and left without much clue as to what
        bug in the mass of accumulating math calculations led to this result.
        The fact that raytracing itself is inherently recursive by following a
        ray bouncing around the scene many layers deep does not help this sense
        of a &quot;black box&quot; predicament.
      </p>
      <p className={paragraphCss}>
        The bug of note that I&apos;ll mention here came about when I noticed
        some shadowing visual artifacts left over in some of my scenes. The
        image below gives a good example of the additional darkening cast by the
        projection of one quadrilateral plane onto another below it.
      </p>
      <p className={paragraphCss}>Image should go HERE</p>
      <p className={paragraphCss}>
        The mechanical origins of shadows in a rendered scene are from a ray
        bouncing between two surfaces repeatedly before eventually escaping to
        terminate in a skybox hit or hitting the upper recursion limit set for
        the program. Each bounce and thus further recursion into the raytracing
        routine adds an attenuating darkening factor to the eventual output
        color for that particular ray calculation. That calculation original
        from this code snippet below:
      </p>
      <pre className={codeContainerCss}>
        <code>{`
if let Some(material) = hit_data.clone().material {
    let emitted_color = material.emit(hit_data.point, hit_data.u, hit_data.v);
    if !material.scatter(ray, &mut hit_data, &mut attenuation, &mut scattered) {
        return emitted_color;

    return emitted_color + attenuation * self.ray_color(scattered, depth - 1, world);
}
        `}</code>
      </pre>
      <p className={paragraphCss}>
        Any ray making contact with a material will scatter with the material
        imparting an <code>attenuation</code> factor to the later recursive call
        that is by definition in (0,1) in the normalized color space, leading to
        darkening of the resultant color. It makes sense then that two surfaces
        close together will produce clear shadowing since rays scattered on
        average like the the surface&apos;s normal and are highly likely to
        collide with the second surface just above and vice versa, leading to
        this exact recursive darkening cycle. However, this effect should
        decrease substantially with additional distance between the two
        surfaces, since more scattering rays will avoid collision between the
        pair surfaces and escape into other parts of the scene, avoiding the
        cycle. In my scene, the shadowing instead appears too strong relative to
        the distance between the planes.
      </p>
      <p className={paragraphCss}>
        When I first came across this issue, my first steps were to try to
        reproduce it under a variety of different conditions. With two different
        types of geometry primitives (spheres and quads), four different
        materials (Lambertian, Dielectric, Metals, and Isotropics), and
        different texturing options, it made sense to narrow down whether this
        only occurred in a subset of these elements. It also helped that I could
        scale down high-fidelity inputs like the recursive call limit and the
        final image resolution to improve runtime while checking for the
        presence of these inaccurate shadows.
      </p>
      <p className={paragraphCss}>
        In the end, it seemed that only <b>quads</b> with <b>Lambertian</b>{" "}
        materials would cast the shadow artifacts. Although this narrowed down
        the source of the issue, the be completely sure, I set up a dummy scene
        with two quads directly in line along the vertical axis so that I would
        presumably get full coverage of the shadow of one atop the other.
        Calculating and logging the variation of the angle of the scattered ray
        from the plane normal revealed the problem: the scattered rays off of
        the Lambertian quads were using a <b>non-normalized normal!</b>
      </p>
      <p className={paragraphCss}>
        Lambertian reflectance commonly uses a simple trick of summing together
        a surfaces normal with a randomly sampled unit vector to generate the
        distribution of scattered vector coming off the surface and the correct
        visual diffuse pattern.
      </p>
      <pre className={codeContainerCss}>
        <code>{`
let mut scatter_direction = hit_data.normal + Vec3::random_unit_vector();
        `}</code>
      </pre>
      <p className={paragraphCss}>
        Importantly, the normal vector should be normalized to a unit vector,
        otherwise the magnitude of the two vectors involved in the summation
        will not match and the normal could possibly completely dominate the
        resultant scattering direction, leading to a distribution much too
        tightly centered around the normal direction. This is exactly what
        occurred for me and produced the extreme shadows through repeated,
        incorrect normal scattering between planes. A simple corrected to a unit
        vector normal fixed everything!
      </p>
      <p className={paragraphCss}></p>
      <h4 className={headerCss}>Further Refinements and Next Steps</h4>
      <p className={paragraphCss}>
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
      <p className={paragraphCss}>
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
      <p className={paragraphCss}>
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
