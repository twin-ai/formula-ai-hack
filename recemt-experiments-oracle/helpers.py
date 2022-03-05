def _check_feature_names_in(estimator, input_features=None):
    """Get output feature names for transformation.
    Parameters
    ----------
    input_features : array-like of str or None, default=None
        Input features.
        - If `input_features` is `None`, then `feature_names_in_` is
            used as feature names in. If `feature_names_in_` is not defined,
            then names are generated: `[x0, x1, ..., x(n_features_in_)]`.
        - If `input_features` is an array-like, then `input_features` must
            match `feature_names_in_` if `feature_names_in_` is defined.
    Returns
    -------
    feature_names_in : ndarray of str
        Feature names in.
    """

    feature_names_in_ = getattr(estimator, "feature_names_in_", None)
    n_features_in_ = getattr(estimator, "n_features_in_", None)

    if input_features is not None:
        input_features = np.asarray(input_features, dtype=object)
        if feature_names_in_ is not None and not np.array_equal(
            feature_names_in_, input_features
        ):
            raise ValueError("input_features is not equal to feature_names_in_")

        if n_features_in_ is not None and len(input_features) != n_features_in_:
            raise ValueError(
                "input_features should have length equal to number of "
                f"features ({n_features_in_}), got {len(input_features)}"
            )
        return input_features

    if feature_names_in_ is not None:
        return feature_names_in_

    # Generates feature names if `n_features_in_` is defined
    if n_features_in_ is None:
        raise ValueError("Unable to generate feature names without n_features_in_")

    return np.asarray([f"x{i}" for i in range(n_features_in_)], dtype=object)


def get_feature_names_out(estimator, input_features=None):
    """Mask feature names according to selected features.
    Parameters
    ----------
    input_features : array-like of str or None, default=None
        Input features.
        - If `input_features` is `None`, then `feature_names_in_` is
          used as feature names in. If `feature_names_in_` is not defined,
          then names are generated: `[x0, x1, ..., x(n_features_in_)]`.
        - If `input_features` is an array-like, then `input_features` must
          match `feature_names_in_` if `feature_names_in_` is defined.
    Returns
    -------
    feature_names_out : ndarray of str objects
        Transformed feature names.
    """
    input_features = _check_feature_names_in(estimator, input_features)
    return input_features[estimator.get_support()]
