import Pkg

Pkg.activate("/opt/julia/environments/v1.0")
Pkg.pkg"add BayesNets Clp Clustering Colors Compat DifferentialEquations DiffEqCallbacks Distributions Expectations GLM GR HDF5 IJulia InstantiateFromURL Ipopt JuMP Lazy NLopt ODE Optim Parameters PGFPlots Plots PyCall#master QuantEcon RDatasets Revise Stan Sundials SymPy"
Pkg.pkg"add PyCall"

Pkg.pkg"build"
Pkg.pkg"precompile"
Pkg.instantiate()
