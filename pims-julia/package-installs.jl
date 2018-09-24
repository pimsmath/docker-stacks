import Pkg

metadata_packages = [
    "BinDeps",
    "Cairo",
    "Calculus",
    "Clustering",
    "Clp",
    "Colors",
    "DataArrays",
    "DataFrames",
    "DataFramesMeta",
    "Dates",
    "DecisionTree",
    "Distributions",
    "Distances",
    "GLM",
    "HDF5",
    "HypothesisTests",
    "IJulia",
    "Ipopt",
    "JSON",
    "KernelDensity",
    "Lazy",
    "MLBase",
    "MultivariateStats",
    "NLopt",
    "Optim",
    "ODE",
    "PDMats",
    "PGFPlots",
    "Plots",
    "PyCall",
    "PyPlot",
    "QuantEcon",
    "RDatasets",
    "SQLite",
    "Stan",
    "StatsBase",
    "Sundials",
    "ZipFile",
    "ZMQ"
]

Pkg.add(metadata_packages)
precompile

using IJulia
