from enum import Enum


class State(str, Enum):
    INITIAL = "INITIAL"
    Q1 = "Q1"
    Q2 = "Q2"
    Q3 = "Q3"
    Q4 = "Q4"
    Q5 = "Q5"
    Q6 = "Q6"
    Q7 = "Q7"
    INVALIDATION_STATE = "INVALIDATION_STATE"