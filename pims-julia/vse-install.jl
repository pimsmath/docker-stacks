import Pkg

Pkg.activate("/opt/julia/environments/v1.0")

import InstantiateFromURL
InstantiateFromURL.activate_github("QuantEcon/QuantEconLecturePackages", tag = "v0.3.1")
InstantiateFromURL.activate_github("QuantEcon/QuantEconLecturePackages")
InstantiateFromURL.activate_github("QuantEcon/QuantEconLectureAllPackages")
Pkg.build()
Pkg.precompile()

